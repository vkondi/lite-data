import logging
import pandas as pd
from flask import Flask, request, jsonify, send_file, make_response
from flask_cors import CORS
from faker import Faker
from typing import Optional
from datetime import datetime
import io

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create a Flask instance
app = Flask(__name__)
CORS(app, expose_headers=["Content-Disposition"])

# Create a Faker instance for generating fake data
faker = Faker()

# Define a dictionary mapping field types to their corresponding data generators
DATA_GENERATORS = {
    "name": faker.name,
    "phone": faker.phone_number,
    "number": lambda: faker.random_int(min=10000, max=100000),
    "boolean": faker.boolean,
    "date": faker.date,
    "email": faker.email,
    "time": faker.time,
    "address": faker.address,
    "city": faker.city,
    "country": faker.country,
    "zipCode": faker.zipcode,
    "company": faker.company,
    "jobTitle": faker.job,
    "color": faker.color_name,
    "uuid": faker.uuid4,
    "url": faker.url,
    "ipAddress": faker.ipv4,
    "macAddress": faker.mac_address,
    "constant": lambda: "Constant Value",
    "list": lambda: faker.random_element(["A", "B", "C"]),
    "alphanumeric": faker.bothify,
    "auto_increment": lambda n: n,
}

@app.route("/api/get-config", methods=["GET"])
def get_config():
    """
    Get the configurations for generating data
    """
    return jsonify({
        "message": "success",
        "allowedDataTypes": list(DATA_GENERATORS)
    })
    
def generate_data(data_request):
    """
    Generate data based on the provided fields and count
    """
    records = []
    
    # Loop through the number of records to generate
    for i in range(data_request["count"]):
        row = {}
        
        # Process each field in the request
        for field in data_request["fields"]:
            field_name = field["name"]
            field_type = field["dataType"]
            generator = DATA_GENERATORS.get(field_type)
            
            # Check if the field type is valid
            if not generator:
                valid_types = ", ".join(DATA_GENERATORS.keys())
                return {"error": f"Unknown field type: {field_type}. Valid types are: {valid_types}"}
            
            # Handle auto incrementing fields separately
            if field_type == "auto_increment":
                row[field_name] = generator(i + 1)
            else:
                row[field_name] = generator()
            
        records.append(row)
            
    return records

@app.route("/generate", methods=["POST"])
def generate():
    """
    Generate data based on the provided fields and count
    """
    data_request = request.json
    records = generate_data(data_request)
    
    # Check if the data generation was successful
    if isinstance(records, dict) and "error" in records:
        return jsonify(records), 400
        
    return jsonify(records)

@app.route("/api/export", methods=["POST"])
def export_data():
    """
    Generate and export data to a file in the specified format
    """
    data_request = request.json
    
    # Set default file_format if not provided
    if "file_format" not in data_request:
        data_request["file_format"] = "csv"
        
    # Generate data based on the request
    records = generate_data(data_request)
    
    # Check if the data generation was successful
    if isinstance(records, dict) and "error" in records:
        return jsonify(records), 400
    
    # Convert the generated data to a DataFrame
    df = pd.DataFrame(records)
    
    # Get the requested file format and convert it to lowercase
    file_format = data_request["file_format"].lower()
    
    # Always use BytesIO for Flask's send_file
    buffer = io.BytesIO()
    
    # Convert the data to the requested file format
    if file_format == "csv":
        # Convert to CSV and then to bytes for BytesIO
        csv_data = df.to_csv(index=False, encoding='utf-8')
        buffer.write(csv_data.encode('utf-8'))
        media_type = "text/csv"
        extension = "csv"
    elif file_format == "json":
        # Convert to JSON and then to bytes for BytesIO
        json_data = df.to_json(orient="records", force_ascii=False)
        buffer.write(json_data.encode('utf-8'))
        media_type = "application/json"
        extension = "json"
    elif file_format == "xlsx":
        # Excel writer works directly with BytesIO
        with pd.ExcelWriter(buffer, engine="xlsxwriter") as writer:
            df.to_excel(writer, index=False)
        media_type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        extension = "xlsx"
    elif file_format == "xml":
        # Process column names and convert to XML
        df.columns = [col.replace(" ", "_") for col in df.columns]
        xml_data = df.to_xml(root_name="data", row_name="record", encoding="utf-8")
        if isinstance(xml_data, bytes):
            buffer.write(xml_data)
        else:
            buffer.write(xml_data.encode('utf-8'))
        media_type = "application/xml"
        extension = "xml"
    elif file_format == 'html':
        # Convert to HTML and then to bytes for BytesIO
        html_data = df.to_html(index=False)
        buffer.write(html_data.encode('utf-8'))
        media_type = "text/html"
        extension = "html"
    else:
        return jsonify({"error": f"Unsupported file format: {file_format}"}), 400
    
    # Reset buffer pointer to the start
    buffer.seek(0)
    
    # Define the file name based on the current date and time
    file_name = f"generated_data_{datetime.now().strftime('%Y-%m-%d_%H-%M-%S')}.{extension}"
    
    logger.info(f"\nfile_name: {file_name}")
    
    # Return the file using send_file
    return send_file(
        buffer,
        mimetype=media_type,
        as_attachment=True,
        download_name=file_name
    )

if __name__ == "__main__":
    app.run(debug=True)
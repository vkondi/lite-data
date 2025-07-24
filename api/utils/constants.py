from faker import Faker

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
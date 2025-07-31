from flask import Flask
from flask_cors import CORS
from config import is_production, logger
from routes.common_routes import common_bp
from routes.health_routes import health_bp
from routes.data_routes import data_bp

def create_app():
    """
    Application factory pattern for creating a Flask application instance.
    """
    app = Flask(__name__)
    
    # Configure CORS
    CORS(app, expose_headers=['Content-Disposition'])
    
    # Register blueprints
    app.register_blueprint(health_bp, url_prefix="/api")
    app.register_blueprint(common_bp, url_prefix="/api/common")
    app.register_blueprint(data_bp, url_prefix="/api/data")
    
    return app


app = create_app()

if __name__ == "__main__":
    logger.info("Starting Flask application")
    
    # Enable debug mode only in development
    debug_mode = not is_production
    logger.info(f"Debug mode: {debug_mode}")
    app.run(debug=debug_mode)
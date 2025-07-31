from flask import Blueprint, jsonify
from config import logger

# Create route blueprint
health_bp = Blueprint("health",__name__)

# URL: /api/health
@health_bp.route("/health", methods=["GET"])
def health_check():
    """
    Health check endpoint to verify the API is running
    """
    logger.info("[/health] >> Health check endpoint called")
    return jsonify({
        "status": "healthy",
        "message": "API is running"
    })
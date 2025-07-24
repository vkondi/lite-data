from flask import Blueprint, jsonify
from config import logger
from utils.constants import DATA_GENERATORS

# Create route blueprint
common_bp = Blueprint("common",__name__)

# URL: /api/common/get-config
@common_bp.route("/get-config", methods=["GET"])
def get_config():
    """
    Get the configurations for generating data
    """
    logger.info("[/common/get-config] >> Get config endpoint called")
    
    return jsonify({
        "message": "success",
        "allowedDataTypes": list(DATA_GENERATORS)
    })
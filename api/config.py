import logging
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Check environment
is_production = os.getenv("ENVIRONMENT") == "production" or os.getenv("VERCEL") == '1'
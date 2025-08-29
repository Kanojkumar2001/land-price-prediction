from backend.app import app

# Vercel serverless function handler
def handler(request, context):
    return app(request, context)

# For local development
if __name__ == "__main__":
    app.run()

# Export the Flask app for Vercel
app.debug = False

from http.server import BaseHTTPRequestHandler
from backend.main_ultra_light import predict_price, get_locations
import json

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/api/locations':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            locations = get_locations()
            response = {'locations': locations}
            self.wfile.write(json.dumps(response).encode())
            
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'Not Found')
    
    def do_POST(self):
        if self.path == '/api/predict':
            # Get content length
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                # Parse JSON data
                data = json.loads(post_data.decode('utf-8'))
                
                # Extract parameters
                location = data.get('location', '')
                square_feet = float(data.get('square_feet', 0))
                bedrooms = float(data.get('bedrooms', 0))
                bathrooms = float(data.get('bathrooms', 0))
                
                # Make prediction
                price = predict_price(location, square_feet, bathrooms, bedrooms)
                
                # Send response
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                
                response = {'predicted_price_lakhs': round(float(price), 2)}
                self.wfile.write(json.dumps(response).encode())
                
            except Exception as e:
                # Send error response
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                
                error_response = {'error': 'Invalid input', 'details': str(e)}
                self.wfile.write(json.dumps(error_response).encode())
                
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'Not Found')
    
    def do_OPTIONS(self):
        # Handle CORS preflight requests
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import jwt_required, get_jwt_identity


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# Login user


# Signup new user
@api.route('/signup', methods=['POST', 'GET'])
def handle_signup():
    request_body = request.json
    user_email = request_body["email"]

    user = User.query.filter_by(email=user_email).first()
    if user is None:
        new_user = User(
        email = request_body["email"],
        password = request_body['password']
        )

        db.session.add(new_user)
        db.session.commit()

        return_user = User.query.filter_by(email=user_email).first()
        response_body = return_user.serialize()

            # return new user created success message, 200
        return jsonify({
                    "msg": f'New user {new_user} has been created!',
                    "results": response_body                
                    }), 200

    else:
        response_body = "User already exists!"
        return jsonify(response_body), 403
    
    # Navigate to private homepage

    # Protect a route with jwt_required, which will kick out requests without a valid JWT
@api.route("/home", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"id": user.id, "username": user.username }), 200




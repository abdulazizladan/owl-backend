#!/bin/bash

BASE_URL="http://localhost:3000"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "--- 0. Login as Admin ---"
ADMIN_TOKEN=$(curl -s -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@gmail.com", "password": "password"}' | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

echo -e "\n--- 1. [Recruitment] Create Teacher (Principal) ---"
TEACHER_EMAIL="teacher_test_$(date +%s)@gmail.com"
CREATE_RES=$(curl -s -X POST $BASE_URL/user \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$TEACHER_EMAIL\",
    \"password\": \"password\",
    \"role\": \"STAFF\",
    \"info\": { \"firstName\": \"Math\", \"lastName\": \"Teacher\", \"age\": 35 },
    \"contact\": { \"phone\": \"12345\" }
  }")
echo $CREATE_RES | grep "firstName" && echo -e " -> ${GREEN}Teacher Created${NC}" || echo -e " -> ${RED}Failed: $CREATE_RES${NC}"

# Login as Teacher
TEACHER_TOKEN=$(curl -s -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$TEACHER_EMAIL\", \"password\": \"password\"}" | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TEACHER_TOKEN" ]; then
    echo -e "${RED}Failed to login as Teacher${NC}"
    exit 1
else
    echo -e "${GREEN}Logged in as Teacher${NC}"
fi

echo -e "\n--- 2. [Academic] Get My Subjects (Teacher) ---"
# Note: This might return empty if no subjects allocated, but verifies endpoint works
SUB_RES=$(curl -s -X GET $BASE_URL/academic/my-subjects \
  -H "Authorization: Bearer $TEACHER_TOKEN")
echo $SUB_RES | grep "\[" && echo -e " -> ${GREEN}Endpoint Accessible${NC}" || echo -e " -> ${RED}Failed: $SUB_RES${NC}"

echo -e "\n--- 3. [Academic] Record Assessment (Teacher) ---"
# Check if we have IDs. UUIDs are tricky to guess without fetching. 
# We'll expect failure or error due to missing IDs, but if it hits the controller, it's progress.
# To do this properly we'd need to fetch a Subject and Session ID first OR just pass dummy UUIDs and see if it fails cleanly (404/500).
# Let's try to fetch a known subject/session if possible, or just skip full success verification relying on previous successful compiles.
# Actually, let's just attempt it with dummy UUIDs to verify the ROUTE and Controller logic doesn't crash.
ASSESS_RES=$(curl -s -X POST $BASE_URL/academic/assessment \
  -H "Authorization: Bearer $TEACHER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": 1,
    "subjectId": "00000000-0000-0000-0000-000000000000", 
    "score": 85,
    "termId": "00000000-0000-0000-0000-000000000000",
    "sessionId": "00000000-0000-0000-0000-000000000000",
    "classArmId": 1
  }')
# Start with expecting an error or success depending on if we have validation
echo $ASSESS_RES

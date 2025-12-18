#!/bin/bash

BASE_URL="http://localhost:3000"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "--- 0. Login as Admin (for setup) ---"
ADMIN_TOKEN=$(curl -s -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@gmail.com", "password": "password"}' | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)


echo "--- 1. Login as Staff ---"
STAFF_TOKEN=$(curl -s -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "staff@gmail.com", "password": "password"}' | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

if [ -z "$STAFF_TOKEN" ]; then
    echo -e "${RED}Failed to login as Staff. Creating Staff user...${NC}"
    # Create Staff
    curl -s -X POST $BASE_URL/user \
      -H "Authorization: Bearer $ADMIN_TOKEN" \
      -H "Content-Type: application/json" \
      -d '{
        "email": "staff@gmail.com",
        "password": "password",
        "role": "STAFF",
        "info": { "firstName": "Bursar", "lastName": "Money", "age": 45 },
        "contact": { "phone": "911" }
      }'
    
    # Retry Login
    STAFF_TOKEN=$(curl -s -X POST $BASE_URL/auth/login \
      -H "Content-Type: application/json" \
      -d '{"email": "staff@gmail.com", "password": "password"}' | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)
fi

if [ -z "$STAFF_TOKEN" ]; then
    echo -e "${RED}Still failed to login as Staff${NC}"
    exit 1
else
    echo -e "${GREEN}Logged in as Staff${NC}"
fi

echo -e "\n--- 2. [Bursary] Create Fee Type ---"
FEE_RES=$(curl -s -X POST $BASE_URL/payment/fees \
  -H "Authorization: Bearer $STAFF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Hostel Fee",
    "amount": 50000,
    "description": "Accommodation for Term 1"
  }')
echo $FEE_RES | grep "Hostel Fee" && echo -e " -> ${GREEN}Fee Type Created${NC}" || echo -e " -> ${RED}Failed: $FEE_RES${NC}"
FEE_ID=$(echo $FEE_RES | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)

echo -e "\n--- 3. [Bursary] Record Fee Payment ---"
PAY_RES=$(curl -s -X POST $BASE_URL/payment \
  -H "Authorization: Bearer $STAFF_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"userId\": 1,
    \"amount\": 50000,
    \"status\": \"completed\",
    \"feeId\": $FEE_ID
  }")
echo $PAY_RES | grep "50000" && echo -e " -> ${GREEN}Payment Recorded${NC}" || echo -e " -> ${RED}Failed: $PAY_RES${NC}"
PAY_ID=$(echo $PAY_RES | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)

if [ ! -z "$PAY_ID" ]; then
    echo -e "\n--- 4. [Bursary] Generate Receipt ---"
    RCPT_RES=$(curl -s -X GET $BASE_URL/payment/receipt/$PAY_ID \
      -H "Authorization: Bearer $STAFF_TOKEN")
    echo $RCPT_RES | grep "RCPT-" && echo -e " -> ${GREEN}Receipt Generated${NC}" || echo -e " -> ${RED}Failed${NC}"
fi


echo -e "\n--- 5. [Enrollment] Enroll New Student ---"
ENROLL_RES=$(curl -s -X POST $BASE_URL/student/enroll \
  -H "Authorization: Bearer $STAFF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "New",
    "lastName": "Prospective",
    "email": "new.student@gmail.com",
    "gender": "M",
    "dateOfBirth": "2010-01-01",
    "dateEnrolled": "2025-09-01",
    "middleName": "A"
  }')
echo $ENROLL_RES | grep "Studded added successfully" && echo -e " -> ${GREEN}Student Enrolled${NC}" || echo -e " -> ${RED}Failed: $ENROLL_RES${NC}"

#!/bin/bash

BASE_URL="http://localhost:3000"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "--- 1. Login as Admin ---"
ADMIN_TOKEN=$(curl -s -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@gmail.com", "password": "password"}' | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

if [ -z "$ADMIN_TOKEN" ]; then
    echo -e "${RED}Failed to login as Admin${NC}"
    exit 1
else
    echo -e "${GREEN}Logged in as Admin${NC}"
fi

echo -e "\n--- 2. Ensure Staff User Exists ---"
# Check if staff exists (optional, simply try to create. If exists, it might fail or we ignore. 
# Better: Just Create a temp staff for this run to be sure, or rely on 'staff@gmail.com')
# We'll just try to login as staff directly. If fail, we use Admin to create one.

echo "--- 3. Login as Staff ---"
STAFF_TOKEN=$(curl -s -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "staff@gmail.com", "password": "password"}' | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

if [ -z "$STAFF_TOKEN" ]; then
    echo -e "${RED}Failed to login as Staff. Creating Staff user...${NC}"
    # Create Staff
    CREATE_RES=$(curl -s -X POST $BASE_URL/user \
      -H "Authorization: Bearer $ADMIN_TOKEN" \
      -H "Content-Type: application/json" \
      -d '{
        "email": "staff@gmail.com",
        "password": "password",
        "role": "STAFF",
        "info": { "firstName": "Nurse", "lastName": "Ratched", "age": 40 },
        "contact": { "phone": "911" }
      }')
    echo "Created Staff: $CREATE_RES"
    
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


echo -e "\n--- 4. [Health] Create Health Record (Nurse) ---"
HEALTH_RES=$(curl -s -X POST $BASE_URL/health \
  -H "Authorization: Bearer $STAFF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": 1,
    "allergies": "Peanuts",
    "bloodGroup": "O+"
  }')
echo $HEALTH_RES | grep "Peanuts" && echo -e " -> ${GREEN}Health Record Created${NC}" || echo -e " -> ${RED}Failed${NC}"


echo -e "\n--- 5. [Library] Add Book (Librarian) ---"
BOOK_RES=$(curl -s -X POST $BASE_URL/library/books \
  -H "Authorization: Bearer $STAFF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Things Fall Apart",
    "author": "Chinua Achebe",
    "quantity": 5
  }')
echo $BOOK_RES | grep "Chinua Achebe" && echo -e " -> ${GREEN}Book Added${NC}" || echo -e " -> ${RED}Failed${NC}"
BOOK_ID=$(echo $BOOK_RES | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)


if [ ! -z "$BOOK_ID" ]; then
    echo -e "\n--- 6. [Library] Borrow Book (Librarian) ---"
    BORROW_RES=$(curl -s -X POST $BASE_URL/library/borrow \
      -H "Authorization: Bearer $STAFF_TOKEN" \
      -H "Content-Type: application/json" \
      -d "{
        \"bookId\": $BOOK_ID,
        \"studentId\": 1
      }")
    echo $BORROW_RES | grep "BORROWED" && echo -e " -> ${GREEN}Book Borrowed${NC}" || echo -e " -> ${RED}Failed${NC}"
fi

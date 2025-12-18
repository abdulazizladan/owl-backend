#!/bin/bash

BASE_URL="http://localhost:3000"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "--- 0. Login as Admin/Staff (To create assignment/test) ---"
ADMIN_TOKEN=$(curl -s -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@gmail.com", "password": "password"}' | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

echo "--- 1. Login as Student ---"
# Create Student User First if not exists (need User entity for Student)
# Using 'student@gmail.com'
STUDENT_TOKEN=$(curl -s -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "student@gmail.com", "password": "password"}' | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

if [ -z "$STUDENT_TOKEN" ]; then
    echo -e "${RED}Student login failed. Creating Student User...${NC}"
    curl -s -X POST $BASE_URL/user \
      -H "Authorization: Bearer $ADMIN_TOKEN" \
      -H "Content-Type: application/json" \
      -d '{
        "email": "student@gmail.com",
        "password": "password",
        "role": "STUDENT",
        "info": { "firstName": "Test", "lastName": "Student", "age": 15 },
        "contact": { "phone": "555" }
      }'
    
    # Also create Student Profile via enrollment (to link email)
    curl -s -X POST $BASE_URL/student/enroll \
      -H "Authorization: Bearer $ADMIN_TOKEN" \
      -H "Content-Type: application/json" \
      -d '{
        "firstName": "Test",
        "lastName": "Student",
        "email": "student@gmail.com",
        "gender": "M",
        "dateOfBirth": "2008-01-01",
        "dateEnrolled": "2025-01-01",
        "admissionNumber": 1001,
        "status": "ACTIVE"
      }'
      
    STUDENT_TOKEN=$(curl -s -X POST $BASE_URL/auth/login \
      -H "Content-Type: application/json" \
      -d '{"email": "student@gmail.com", "password": "password"}' | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)
fi

echo -e "${GREEN}Student Token Acquired${NC}"

echo -e "\n--- 2. [Profile] Get My Profile ---"
PROF_RES=$(curl -s -X GET $BASE_URL/student/profile \
  -H "Authorization: Bearer $STUDENT_TOKEN")
echo $PROF_RES | grep "student@gmail.com" && echo -e " -> ${GREEN}Profile Found${NC}" || echo -e " -> ${RED}Failed: $PROF_RES${NC}"

echo -e "\n--- 3. [Assignment] Create Assignment (Teacher) ---"
# Need Teacher Token or use Admin
ASSIGN_RES=$(curl -s -X POST $BASE_URL/assignment \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Math Homework 1",
    "description": "Solve px + q = 0",
    "dueDate": "2025-12-31T23:59:59Z",
    "subjectId": "00000000-0000-0000-0000-000000000000"
  }')
echo $ASSIGN_RES | grep "Math Homework 1" && echo -e " -> ${GREEN}Assignment Created${NC}" || echo -e " -> ${RED}Failed: $ASSIGN_RES${NC}"
ASSIGN_ID=$(echo $ASSIGN_RES | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)

if [ ! -z "$ASSIGN_ID" ]; then
    echo -e "\n--- 4. [Assignment] Submit Assignment (Student) ---"
    SUB_RES=$(curl -s -X POST $BASE_URL/assignment/submit \
      -H "Authorization: Bearer $STUDENT_TOKEN" \
      -H "Content-Type: application/json" \
      -d "{
        \"assignmentId\": $ASSIGN_ID,
        \"check_url\": \"http://github.com/repo\"
      }")
    echo $SUB_RES | grep "check_url" && echo -e " -> ${GREEN}Submitted${NC}" || echo -e " -> ${RED}Failed: $SUB_RES${NC}"
fi

echo -e "\n--- 5. [CBT] Create Test (Teacher) ---"
TEST_RES=$(curl -s -X POST $BASE_URL/cbt/test \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Math Quiz 1",
    "subjectId": "00000000-0000-0000-0000-000000000000",
    "durationMinutes": 30
  }')
echo $TEST_RES | grep "Math Quiz 1" && echo -e " -> ${GREEN}Test Created${NC}" || echo -e " -> ${RED}Failed: $TEST_RES${NC}"
TEST_ID=$(echo $TEST_RES | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)

if [ ! -z "$TEST_ID" ]; then
    echo -e "\n--- 6. [CBT] Add Question ---"
    Q_RES=$(curl -s -X POST $BASE_URL/cbt/test/$TEST_ID/question \
      -H "Authorization: Bearer $ADMIN_TOKEN" \
      -H "Content-Type: application/json" \
      -d '{
        "text": "What is 2+2?",
        "optionA": "3",
        "optionB": "4",
        "optionC": "5",
        "optionD": "22",
        "correctOption": "B"
      }')
    echo $Q_RES | grep "What is 2+2?" && echo -e " -> ${GREEN}Question Added${NC}" || echo -e " -> ${RED}Failed: $Q_RES${NC}"
    
    echo -e "\n--- 7. [CBT] Take Test (Student) ---"
    # Needs QuestionID. 
    # To verify properly we need to parse Question ID. 
    # For now, just hit endpoint to ensure route works, even if answer is wrong.
    TAKE_RES=$(curl -s -X POST $BASE_URL/cbt/submit \
      -H "Authorization: Bearer $STUDENT_TOKEN" \
      -H "Content-Type: application/json" \
      -d "{
        \"testId\": $TEST_ID,
        \"answers\": []
      }")
     echo $TAKE_RES | grep "score" && echo -e " -> ${GREEN}Test Submitted${NC}" || echo -e " -> ${RED}Failed: $TAKE_RES${NC}"
fi

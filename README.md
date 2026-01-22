# Project One
For Project One, you are required to build a full-stack application that satisfies the requirements set forth below. Your ERMS must abide by following:

## Technology

* RESTful API built with Spring Boot
* Data stored in PostgreSQL database
* Front-End Built with TypeScript React

#### User Stories
- Employees can login to their account. 
- Employees can register for a new account. 
- Employees can submit a ticket (with price and description) for reimbursement.
- Employees can view their past tickets. 
- Employees can view pending tickets. 
- Employees can view tickets ordered by date. 
- Managers can login to their account.
- Managers can view all pending requests.
- Managers can view past tickets for all employees in the company.
- Managers can accept/deny reimbursement requests. 

#### Partner Work
- We have an odd number of people, so one team of 3
  - I will add some stretch goals so that this team has more to work on
- Make sure each member of the team is working on both front-end and back-end
  - Split up the work by feature
  - Pair Programming - one person codes while the other person looks on and keeps an eye out for syntax/issues
    - Swap every 10 or so minutes
- One repo per team

### Stretch Goals
- Monthly Budget - Come up with a monthly limit for employees. Any requests that are submitted which would surpass a given employee's monthly limit are flagged in some way so managers are aware when going in to approve/deny. 
- Expense Categories - Pre-defined categories such as food, travel, etc. Upon selecting a category, fields are auto-populated with default values which the employees can modify as they please before submitting the expense request. 
- Profile Information - Employees can navigate to a Profile Page on the website and edit personal information like address, phone number, profile picture, etc.
- Ticket Status History - Track the individual actions taken on tickets (submitted, approved, denied, etc.). Store these events in a history table and allow the manager to view these on the front-end. Each entry in the table should include
  - EmployeeId
  - Amount
  - Action Taken (Created, Approved, Denied)
  - ManagerId (if there is a manager associated with this action)
  - Any other information that might be relevant
- Ticket Comments - Require managers to include a comment when approving or denying. Employees can respond to these comments and request to re-open the ticket (only once per ticket). 

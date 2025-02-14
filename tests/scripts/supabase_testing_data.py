import csv
import random
import string

# Function to generate a random email
def random_email():
    domains = ["gmail.com", "yahoo.com", "outlook.com", "example.com"]
    name = ''.join(random.choices(string.ascii_lowercase, k=7))
    return f"{name}@{random.choice(domains)}"

# Function to generate a random text of 200 characters
def random_text(length=200):
    return ''.join(random.choices(string.ascii_letters + string.digits + " ", k=length))

# Define the number of rows
num_rows = 1000  
csv_filename = "random_data.csv"

# Generate and write CSV data
with open(csv_filename, mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["a", "b", "c"])  # Writing headers

    for _ in range(num_rows):
        writer.writerow([random_email(), random.randint(0, 255), random_text()])

print(f"CSV file '{csv_filename}' generated with {num_rows} rows.")

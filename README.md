# Send an API request with a big volume of data

<span style="color:red">**PROBLEM:**</span> You need to use an API Braze endpoint but there is a limit on how many user’s id you can send per request. If you want to send more than 30k users on a request that the limit is 50 you cannot copy&paste each batch of 50 because you will lose your time (and patience)

<span style="color:green">**SOLUTION:**</span> With ChatGPT’s help, I developed a script to automate this process.

<span style="color:yellow">**DISCLAIMER:**</span> I’m trying to be as general as I can but the original use case was: A CSV of 30k users was incorrectly uploaded to a Braze dashboard and I wanted to delete it but the endpoint `https://rest.iad-0x.braze.com/users/delete`  has this limit of 50 user deletes per request. The idea is that it could be useful for similar future issues.

## Some things to keep in mind:

### CSV File
`const filePath = 'path/users.csv';`  → Here you’ll have to put the csv file path. The file for this script should look something like this:

```txt
external_id
d3bc4bd1-f95c-...-4bbb-a5fe-1ea2
67f97g53-9a6d-...-4a67-b450-8279
1c114555-bb55-...-6676-8f7e-9202
...
```
It is important that the first line has the name of the column you are trying to read. So if you are trying to read another column you can modify the code like `row.external_id` → `row.another_name` 

### API Key & API URL
Ensure that the REST API Key you are using has the right permissions (you can create them in the Braze Dashboard in Settings → APIs and Identifiers → Create API Key)
And for the API endpoint, you should replace it according to which cluster your account belongs to. If you are in cluster 6 it would be `rest.iad-06.braze.com`.

### Batch
You can edit this value according to the limit of the endpoint you are using.

### Node modules
- **fs:** This is the file system module of Node.js. It allows interaction with the server's file system, for example, to read, write, delete files, etc.
- **csv:** This module is used to parse CSV files. It converts rows of the CSV file into JavaScript objects.
- **axios:** This module is used to make HTTP requests. It allows making requests to web servers and handling responses easily. 
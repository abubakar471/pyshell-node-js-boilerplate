import sys

fname = sys.argv[1];
lname = sys.argv[2];

if (fname != "undefined") and (lname != "undefined"):
    print(f"welcome to the dark world of annonymus! mr.{fname} {lname}");
else:
    print("enter your full name to enter!");
    print({
        "error" : "enter both field"
    });
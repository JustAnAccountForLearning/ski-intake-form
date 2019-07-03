import sqlite3
import sys
from flask import g

# Configure SQLite database
DATABASE = "/home/thomas/Documents/skiform/ski-intake-form/project/information.db"

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db



def formatNumber(string):
    """ Parses and formats the phone number to be stored as '+1 (222) 333-4444 """

    # Setup for the return phone number, number of digits in the phone number, and length of input "phoneNumber"
    phone = ""
    n = 0
    length = len(string)

    if length < 10:
        return ''

    for i in range(1, length + 1):
        if string[-i].isnumeric():
            if n is 11:
                phone = " " + phone
            if n is 4:
                phone = " - " + phone
            if n is 7:
                phone = ") " + phone
            if n is 10:
                phone = " " + phone
            phone = string[-i] + phone
            n += 1
        if n is 10:
            phone = "(" + phone
            n += 1

    # Account for country codes that may exist
    if n > 11:
        phone = "+"+ phone

    return phone


def formatName(name):
    """ Formats the names to be consistend in database """

    # Capitilize the first letter of any word
    name = name.title()
    # Strip all the trailing blank spaces from the end of the string
    name = name.rstrip()
    # Strip all leading blank spaces from the beginning of the string
    name = name.lstrip()

    spacesfound = False

    # Remove unwated whitespace characters from the name
    for character in name:
        # Reset spaces found if new word as per title()
        if character.isupper():
            spacesfound = False

        # Eliminate more than one white space between words
        if character is " ":
            if spacesfound:
                name = name.replace(character, "", 1)
            else:
                spacesfound = True

    return name


def customerExists(first, last, phone, email):
    """ Check the database for a pre-existing customer by first and last name, phone number, or email address """
    db = get_db().cursor()

    values = db.execute("SELECT * FROM contactinfo WHERE (first=:first AND last=:last) OR phone=:phone OR email=:email",
                          {"first":first, "last":last, "phone":phone, "email":email}).fetchall()
    
    customer = []
    for i in range(len(values)):
        customer.append(dict(zip(["id", "first", "last", "phone", "email", "address1", "address2", "city", "state", "postal"], values[i])))

    if not customer:
        return None
    else:
        return customer


def skierCode(weight, height, age, skiertype):
    """ Calculate the skiercode given the skier information based on the 2017/2018 Marker Adjustment Chart """

    # Skier Codes by letter
    codes = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"]

    if (not weight) or (not height) or (not age) or (not skiertype):
        return None

    # Convert the incomming strings to integers
    weight = int(weight)
    height = int(height)
    age = int(age)
    skiertype = int(skiertype)

    # Find code by weight
    if 22 < weight < 30:
        return codes[0]
    elif 29 < weight < 39:
        wcol = 1
    elif 38 < weight < 48:
        wcol = 2
    elif 47 < weight < 57:
        wcol = 3
    elif 56 < weight < 67:
        wcol = 4
    elif 66 < weight < 79:
        wcol = 5
    elif 78 < weight < 92:
        wcol = 6
    elif 91 < weight < 108:
        wcol = 7
    elif 107 < weight < 126:
        wcol = 8
    elif 125 < weight < 148:
        wcol = 9
    elif 147 < weight < 175:
        wcol = 10
    elif 174 < weight < 211:
        wcol = 11
    elif 210 < weight:
        wcol = 12
    else:
        return None

    # Find code by height in inches
    if height < 59:
        hcol = 7
    elif 58 < height <62:
        hcol = 8
    elif 61 < height < 66:
        hcol = 9
    elif 65 < height < 71:
        hcol = 10
    elif 70 < height < 77:
        hcol = 11
    elif 76 < height:
        hcol = 12
    else:
        return None

    # Find the lower of the two columns based on height and weight
    value = min(wcol, hcol)

    # Adjust for age
    if not (9 < age < 49):
        value -= 1

    # Adjust for skier type
    value += (skiertype - 1)

    # Return the letter Skier Code
    return codes[value]


def initialIndicator(solelength, skiercode):
    """ Calculate the initial indicator setting for the skier based on the given stats """

    # Skier Codes by letter
    codes = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"]

    # Find which row to go to in the setting[] table
    for i, code in enumerate(codes):
        if code is skiercode:
            row = i

    # Find which column to go to in the setting[] table
    l = int(solelength)
    if l < 231:
        col = 1
    elif 230 < l < 251:
        col = 2
    elif 250 < l < 271:
        col = 3
    elif 270 < l < 291:
        col = 4
    elif 290 < l < 311:
        col = 5
    elif 310 < l < 331:
        col = 6
    elif 330 < l < 351:
        col = 7
    elif 351 < l:
        col = 8

    # Initial indicator settings based on the Marker 2018/2019 Binding Adjustment Chart
    setting = [
        ["0.75", "0.75", "0.75", "0.75", "0.75", "0.75", "0.75", "0.75"],
        ["1.00", "0.75", "0.75", "0.75", "0.75", "0.75", "0.75", "0.75"],
        ["1.50", "1.25", "1.25", "1.00", "1.00", "1.00", "1.00", "1.00"],
        ["2.00", "1.75", "1.50", "1.50", "1.25", "1.25", "1.25", "1.25"],
        ["2.50", "0.75", "0.75", "0.75", "0.75", "0.75", "0.75", "0.75"],
        ["3.00", "2.75", "2.50", "2.25", "2.00", "1.75", "1.75", "1.75"],
        ["3.50", "3.50", "3.00", "2.75", "2.50", "2.25", "2.00", "2.00"],
        ["3.50", "3.50", "3.50", "3.00", "3.00", "2.75", "2.50", "2.50"],
        ["4.50", "4.50", "4.50", "4.00", "3.50", "3.50", "3.00", "3.00"],
        ["5.50", "5.50", "5.50", "5.00", "4.50", "4.00", "3.50", "3.00"],
        ["6.50", "6.50", "6.50", "6.00", "5.50", "5.00", "4.50", "4.00"],
        ["7.50", "7.50", "7.50", "7.00", "6.50", "6.00", "5.50", "5.00"],
        ["8.50", "8.50", "8.50", "8.50", "8.00", "7.00", "6.50", "6.00"],
        ["10.00", "10.00", "10.00", "10.00", "9.50", "8.50", "8.00", "7.50"],
        ["11.50", "11.50", "11.50", "11.50", "11.00", "10.00", "9.50", "9.00"],
        ["12.00", "12.00", "12.00", "12.00", "12.00", "12.00", "11.00", "10.50"]]

    return setting[row][col]
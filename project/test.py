# Unit tests for python functions
# Initially the tests are user checked.
import os

from cs50 import SQL
from helpers import formatNumber, formatName, customerExists, skierCode


def test1():
    """ Tests the name formatting """

    # Declare the names to run through
    tomwood = "Tom Wood".lstrip().rstrip()
    print(len(tomwood))
    names = [
        "Tom Wood",
        " Tom Wood  ",
        "tom1 wood2",
        "tom wood",
        "tOM    wOOd   ",
        "tom.wood"]

    # Format the name and then print pass if it matches what is should, otherwise fail
    for name in names:
        newname = formatName(name)
        if (newname in tomwood):
            print("PASS: " + name + " = " + newname)
        else:
            print("FAIL: " + name + " = " + newname)


def test2():
    """ Tests the number formatting """

    # Declare the matching number
    truephones = ["(610) 574 - 4193", "+11 (234) 567 - 8910"]

    # Declare test numbers
    numbers = [
        "(610) 574 - 4193",
        "112345678910",
        "610 5744193"]

    for number in numbers:
        newnumber = formatNumber(number)
        if newnumber in truephones:
            print("PASS: " + number + " = " + newnumber)
        else:
            print("FAIL: " + number + " = " + newnumber)


def test3():
    """ Test for accurate skiercodes """

    #TODO: Test for a couple normal skier codes.
    #TODO: Then check for corner cases like under certain weights, heights, or under/over ages
    print("Not yet implemented")



if __name__ == "__main__":
    print("")
    print("test1: formatName")
    test1()

    print("")
    print("test2: formatNumber")
    test2()

    print("")
    print("test3: skierCode")
    test3()
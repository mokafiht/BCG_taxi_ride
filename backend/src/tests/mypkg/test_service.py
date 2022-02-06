# src/tests/mypkg/test_greeter.py

from mypkg.testservice import say_hello_service

def test_say_hello_appends_name():
    assert say_hello_service("service") == "hello service"
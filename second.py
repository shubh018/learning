from datetime import datetime
import os
import time

from robot.libraries.BuiltIn import BuiltIn
from robot.libraries.DateTime import Date, Time
from env_variables import *
error_list = []


def a():
    """

    This is the definition of this function

    """
    try:
        if 1 < 2:
            raise Exception("First")

    except Exception as e:
        error_list.append(e.args[0])

    finally:
        print("yes 1")


def b():
    try:
        if 1 < 2:
            raise Exception("Second")

    except Exception as e:
        error_list.append(e.args[0])

    finally:
        print("yes 2")


def c():
    try:
        if 1 < 2:
            raise Exception("Third")

    except Exception as e:
        error_list.append(e.args[0])

    finally:
        print("yes")


def check_errors():
    try:
        if len(error_list) != 0:
            raise Exception(f"Found following validation errors: {error_list}")

    except Exception as e:
        raise Exception(e.args[0])


def new_test(**kwargs):
    try:
        # id, test_name (done), execution_time (done), status (done), pp_section(done), rule (done), message (done), system (done), timestamp (done)
        test_name = BuiltIn().get_variable_value('${TEST NAME}')
        BuiltIn().set_suite_variable('${test_name}', test_name)

        kwargs.update({'test_name': test_name})
        kwargs.update(({'pp_section': 'Total Universe'}))
        kwargs.update(({'rule': 'Total Universe coun should never dip below 200M'}))
        kwargs.update(({'message': 'Numbers validated'}))
        kwargs.update(({'system': 'API'}))
        kwargs.update(({'timestamp': Date(datetime.now()).convert('datetime')}))

        start_date = kwargs.get('datee')

    except Exception as e:
        kwargs.update(({'exception_message': e.args[0]}))

        raise Exception(e.args[0])

    finally:
        kwargs.update({'executed_time': get_executed_time(datee=start_date)})
        log_entries(**kwargs)


def get_executed_time(**kwargs):
    start_date = kwargs.get('datee')

    # Get End Time
    now = datetime.now()
    end_time = Date(now).convert('datetime')

    # Get Difference
    diff = end_time - start_date
    elapsed_time = int((diff.seconds * 1000) + (diff.microseconds / 1000))

    return str(elapsed_time) + 'ms'


def log_entries(**kwargs):

    if kwargs.get('exception_message'):
        kwargs.update({'status': 'FAILED'})
        kwargs.update({'message': kwargs.get('exception_message')})
    else:
        kwargs.update({'status': 'PASSED'})

    db_query = "INSERT INTO bidder.PATIENT_PLANNER_BQA_RUN (test_name,execution_time,status, pp_section,rule, message,`system`,timestamp) " \
               "VALUES ({},{},{},{},{},{},{},{});".format(BuiltIn().get_variable_value('${test_name}'), kwargs.get('executed_time'),
                                                          kwargs.get('status'), kwargs.get('pp_section'), kwargs.get('rule'),
                                                          kwargs.get('message'), kwargs.get('system'), kwargs.get('timestamp'))

    print(db_query)


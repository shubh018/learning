import datetime as dt

def testinggggg():
    x = 5  # Days offset.
    start_date = '-500 days'
    end_date = '-1 days'

    today = dt.date.today()
    start_date_final = today + dt.timedelta(days=int(start_date[:start_date.find(' ')]))
    end_date_final = today + dt.timedelta(days=int(end_date[:end_date.find(' ')]))
    print("Start: ", start_date_final)
    print("Start: ", end_date_final)

def rounding_off():
    numb = 249000000
    numb2 = 124000000
    if numb - 2 * numb2 in range(0, 5):
        print('Done')

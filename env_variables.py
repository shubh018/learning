from robot.libraries.BuiltIn import BuiltIn

BuiltInLib = BuiltIn().get_library_instance("BuiltIn")

BuiltInLib.set_suite_variable('${svs}', 'svs')

db_host = 'sample_host'

# print(BuiltInLib.get_variable_value('${svs}'))

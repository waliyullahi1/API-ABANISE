const express = require('express')
const router = express.Router()
const data  = {}
data.employee = require('../../model/employees.json')
const employeesControl = require('../../controllers/employeesControl')
const ROLES_LIST = require('../../config/roles_list')
const verifyroles = require('../../middleware/verifyRoles')

router
  .route("/")

  .get(employeesControl.getAllEmployees)
  .post(employeesControl.createNewEmployee)
  .put( employeesControl.updateEmployee)
  .delete(employeesControl.deleteEmployee);

router.route("/:id")
    .get(employeesControl.getEmployee)


    module.exports = router;
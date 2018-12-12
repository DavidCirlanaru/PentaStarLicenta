using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using PentaStarLicenta.DAL.Context;
using PentaStarLicenta.DAL.Models;

namespace PentaStarLicenta.Controllers
{
    [Authorize(Roles = "Admin")]
    public class EmployeeManagementController : Controller
    {
        private PentaStarContext db = new PentaStarContext();

        // GET: EmployeeManagement
        public ActionResult Index()
        {
            var employees = db.Employees.Include(e => e.JobType);
            return View(employees.ToList());
        }

        // GET: EmployeeManagement/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Employee employee = db.Employees.Find(id);
            if (employee == null)
            {
                return HttpNotFound();
            }
            return View(employee);
        }

        // GET: EmployeeManagement/AddEmployee
        public ActionResult AddEmployee()
        {
            ViewBag.JobTypeId = new SelectList(db.JobTypes, "JobTypeId", "Name");
            return View();
        }

        // POST: EmployeeManagement/AddEmployee
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AddEmployee([Bind(Include = "EmployeeId,FirstName,LastName,Cnp,IdentityCard,Email,Phone,JobTypeId")] Employee employee)
        {
            if (ModelState.IsValid)
            {
                db.Employees.Add(employee);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.JobTypeId = new SelectList(db.JobTypes, "JobTypeId", "Name", employee.JobTypeId);
            return View(employee);
        }

        // GET: EmployeeManagement/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Employee employee = db.Employees.Find(id);
            if (employee == null)
            {
                return HttpNotFound();
            }
            ViewBag.JobTypeId = new SelectList(db.JobTypes, "JobTypeId", "Name", employee.JobTypeId);
            return View(employee);
        }

        // POST: EmployeeManagement/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "EmployeeId,FirstName,LastName,Cnp,IdentityCard,Email,Phone,JobTypeId")] Employee employee)
        {
            if (ModelState.IsValid)
            {
                db.Entry(employee).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.JobTypeId = new SelectList(db.JobTypes, "JobTypeId", "Name", employee.JobTypeId);
            return View(employee);
        }

        // GET: EmployeeManagement/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Employee employee = db.Employees.Find(id);
            if (employee == null)
            {
                return HttpNotFound();
            }
            return View(employee);
        }

        // POST: EmployeeManagement/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Employee employee = db.Employees.Find(id);
            db.Employees.Remove(employee);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}

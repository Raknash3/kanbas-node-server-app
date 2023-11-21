import db from "../Database/index.js";

// Assume db.assignments is an array to store assignments

function AssignmentRoutes(app) {

    // Update an assignment by ID
    app.put("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignmentIndex = db.assignments.findIndex(
            (a) => a._id === aid
        );
        db.assignments[assignmentIndex] = {
            ...db.assignments[assignmentIndex],
            ...req.body
        };
        res.sendStatus(204);
    });

    // Delete an assignment by ID
    app.delete("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        db.assignments = db.assignments.filter((a) => a._id !== aid);
        res.sendStatus(200);
    });

    // Create a new assignment for a course by ID
    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const newAssignment = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        db.assignments.push(newAssignment);
        res.send(newAssignment);
    });

    // Get all assignments for a course by ID
    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments.filter((a) => a.course === cid);
        res.send(assignments);
    });
}

export default AssignmentRoutes;

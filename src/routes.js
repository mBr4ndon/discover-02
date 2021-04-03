const express = require('express')
const routes = express.Router()

const views = __dirname + "/views/"

const Profile = {
  data: {
    name: "Márcio",
    avatar: "https://avatars.githubusercontent.com/u/71975865?v=4",
    monthlyBudget: 500,
    daysPerWeek: 5,
    hoursPerDay: 5,
    vacationPerYear: 4,
    valuePerHour: 75
  },
  controllers: {
    index: (req, res) => res.render(views + "profile", { profile: Profile.data })
  }
}

const Job = {
  data: [
    {
      id: 1,
      name: "El machooo",
      dailyHours: 2,
      totalHours: 1,
      createdAt: Date.now()
    },
    {
      id: 2,
      name: "Sushi bar u.u",
      dailyHours: 3,
      totalHours:47,
      createdAt: Date.now()
    }
  ],
  controllers: {
    index: (req, res) => {
      const updatedJobs = Job.data.map( uJob => {
        const remaining = Job.services.remainingDays(uJob)
        const status = remaining <= 0 ? 'done' : 'progress'
        return {
          ...uJob, 
          remaining: Number(remaining),
          status,
          budget: Profile.data.valuePerHour * uJob.totalHours
        }
      })
    
      return res.render(views + "index", { jobs: updatedJobs })
    },
    create: (req, res) => {
      Job.data.push({
        id: Job.data[jobs.length - 1]?.id || 1,
        name: req.body.name,
        dailyHours: Number(req.body["daily-hours"]),
        totalHours: Number(req.body["total-hours"]),
        createdAt: Date.now()
      })
      return res.redirect('/')
    },
    show: (req, res) => res.render(views + "job")
  },
  services: {
    remainingDays: job => {
      const remainingDays = (job.totalHours / job.dailyHours).toFixed()
    
      const createdDate = new Date(job.createdAt)
      const dueDay = createdDate.getDate() + Number(remainingDays)
      const dueDateInMs = createdDate.setDate(dueDay)
    
      const timeDiffInMs = dueDateInMs - Date.now()
      const timeDiffInDays = Math.floor(timeDiffInMs / (24 * 3600 * 1000))
      
      return timeDiffInDays
    }    
  }
}

routes.get('/', Job.controllers.index)

routes.get('/job', Job.controllers.show)
routes.post('/job', Job.controllers.create)

routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', Profile.controllers.index)

module.exports = routes
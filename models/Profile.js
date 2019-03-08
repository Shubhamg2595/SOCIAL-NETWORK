const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, //associate the user by its ID,
    ref: "users" //also need to refer the collection
  },

  handle: {
    //seo friendly url for profiles
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
    //actually will be a select list in UI side
  },
  skilss: {
    type: [String], //will be array of strings separated by comma
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    //will be displaying github repos of the  users
    type: String
  },
  experience: [
    //creating array of objects in our collection schema
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    //creating array of objects in our collection schema
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: [
    {
      youtube: {
        type: String
      },
      facebook: {
        type: String
      },
      linkedin: {
        type: String
      },
      twitter: {
        type: String
      }
    }
  ],

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);

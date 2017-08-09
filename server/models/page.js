var mongoose = require("mongoose");

var pageSchema = mongoose.Schema(
  {
    url: String,
    meta_robots: String,
    title: String,
    meta_desc: String,
    og_title: String,
    og_desc: String,
    img_alt: Array,
    user_id: String, // linked to User
    domain_name: String, // linked to domain
    scan_group_id: String
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

// create model for pages
module.exports = mongoose.model("Page", pageSchema);

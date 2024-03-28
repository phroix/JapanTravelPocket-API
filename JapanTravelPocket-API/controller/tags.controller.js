const supabase = require("../config/db.config");

//get Tags
exports.getTags = async (req, res) => {
  try {
    let { data: tags, error } = await supabase
      .from("tags")
      .select("*")
      .order("id", { ascending: false });

    if (error) throw err;

    res.send(tags);
  } catch (err) {
    res.status(500).send("Error fetching tags data");
  }
};

//creates Tag
exports.createTag = async (req, res) => {
  try {
    const tag = {
      tag: req.body.tag,
      color: req.body.color,
    };

    const { data, error } = await supabase.from("tags").insert(tag).select();

    if (error) throw err;

    res.status(201).send(data);
  } catch (err) {
    res.status(500).send("Error creating tags data");
  }
};

//updates Tag by id
exports.updateTag = async (req, res) => {
  try {
    const id = req.params.id;

    const tag = {
      tag: req.body.tag,
      color: req.body.color,
    };

    const { data, error } = await supabase
      .from("tags")
      .update(tag)
      .eq("id", id)
      .select();

    if (error) throw err;

    res.status(201).send(data);
  } catch (err) {
    res.status(500).send("Error updating tags data");
  }
};

//deletes Tag by id
exports.deleteTag = async (req, res) => {
  try {
    const id = req.params.id;

    const { error } = await supabase.from("tags").delete().eq("id", id);

    if (error) throw err;

    res.status(200).send("Successfully deleted tag data");
  } catch (err) {
    res.status(500).send("Error deleting tag data");
  }
};

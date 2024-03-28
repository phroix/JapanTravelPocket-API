const supabase = require("../config/db.config");

//gets Spending entry by date
exports.getSpendingByDate = async (req, res) => {
  const date = req.query.date;

  if (!date) {
    return res.status(400).send({
      message: "No date provided for searching entries.",
    });
  }
  try {
    // let { data: spendings, error } = await supabase
    //   .from("spendings")
    //   .select("*")
    //   .eq("date", date)
    //   .order("id", { ascending: false });
    // "id": 10,
    // "name": "Kamakuara",
    // "amount": 500,
    // "currency": 160,
    // "date": "2024-02-15",
    let { data: spendings, error } = await supabase
      .from("spendings")
      .select(`id,name,amount,currency,date,tags (*)`)
      .eq("date", date)
      .order("id", { ascending: false });

    if (error) throw err;

    res.send(spendings);
  } catch (err) {
    res.status(500).send("Error fetching spendings data");
  }
};

//creates Spending by date
exports.createSpending = async (req, res) => {
  try {
    const spending = {
      name: req.body.name,
      amount: req.body.amount,
      currency: req.body.currency,
      date: req.body.date,
      tags_id: req.body.tags_id,
    };

    const { data, error } = await supabase
      .from("spendings")
      .insert(spending)
      .select();

    if (error) throw err;

    res.status(201).send(data);
  } catch (err) {
    res.status(500).send("Error creating spendings data");
  }
};

//updates Spending by id
exports.updateSpending = async (req, res) => {
  try {
    const id = req.params.id;

    const spending = {
      name: req.body.name,
      amount: req.body.amount,
      currency: req.body.currency,
      date: req.body.date,
      tags_id: req.body.tags_id,
    };

    const { data, error } = await supabase
      .from("spendings")
      .update(spending)
      .eq("id", id)
      .select();

    if (error) throw err;

    res.status(201).send(data);
  } catch (err) {
    res.status(500).send("Error updating spending data");
  }
};

//deletes Spending by id
exports.deleteSpending = async (req, res) => {
  try {
    const id = req.params.id;

    const { error } = await supabase.from("spendings").delete().eq("id", id);

    if (error) throw err;

    res.status(200).send("Successfully deleted spending data");
  } catch (err) {
    res.status(500).send("Error deleting spending data");
  }
};

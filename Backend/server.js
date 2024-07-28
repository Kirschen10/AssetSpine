const express = require('express');
const mysql = require('mysql')
const cors  =require('cors')

const app = express()
app.use(cors());
//
app.use(express.json());

const db = mysql.createConnection({
    host:"vm1.manam.co.il",
    user:'manam',
    password:'1122334455',
    database:'db_3dbia_11_studio'
})

///////////// Get commands ////////////////////

app.get('/', (re, res) => {
    return res.json("From BAckend side");
})

app.get('/tbl_asset_spine', (re,res) => {
    const sql = "SELECT * FROM tbl_asset_spine";
    db.query(sql, (err,data) => {
        if(err) res.json(err);
        return res.json(data);
    })
})

app.get('/tbl_users', (re,res) => {
  const sql = "SELECT * FROM tbl_users";
  db.query(sql, (err,data) => {
      if(err) res.json(err);
      return res.json(data);
  })
})

app.get('/tbl_initial_settings', (re,res) => {
    const sql = "SELECT * FROM tbl_initial_settings";
    db.query(sql, (err,data) => {
        if(err) res.json(err);
        return res.json(data);
    })
})

app.get('/tbl_advanced_settings', (re,res) => {
    const sql = "SELECT * FROM tbl_advanced_settings";
    db.query(sql, (err,data) => {
        if(err) res.json(err);
        return res.json(data);
    })
})

app.get('/tbl_folders', (re,res) => {  
  const sql = "SELECT * FROM tbl_folders";
  db.query(sql, (err,data) => {
      if(err) res.json(err);
      return res.json(data);
  })
})

app.get('/tbl_survey', (re,res) => {  
  const sql = "SELECT * FROM tbl_survey";
  db.query(sql, (err,data) => {
      if(err) res.json(err);
      return res.json(data);
  })
})

app.get('/tbl_final_tree_spine', (re,res) => {  
  const sql = "SELECT * FROM tbl_final_tree_spine";
  db.query(sql, (err,data) => {
      if(err) res.json(err);
      return res.json(data);
  })
})

app.listen(8081, () => {
    console.log("Listening...");
})

///////////// Delete commands ////////////////////

app.delete('/tbl_folders/:Bid', (req, res) => {
    const bidToDelete = req.params.Bid;
    const sql = "DELETE FROM tbl_folders WHERE Bid = ?";
  
    db.query(sql, [bidToDelete], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ message: "Rows deleted successfully", affectedRows: result.affectedRows });
      }
    });
  });

  app.delete('/tbl_initial_settings/:Bid', (req, res) => {
    const bidToDelete = req.params.Bid;
    const sql = "DELETE FROM tbl_initial_settings WHERE Bid = ?";
  
    db.query(sql, [bidToDelete], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ message: "Rows deleted successfully", affectedRows: result.affectedRows });
      }
    });
  });

  app.delete('/tbl_advanced_settings/:bridge_id', (req, res) => {
    const bidToDelete = req.params.bridge_id;
    const sql = "DELETE FROM tbl_advanced_settings WHERE bridge_id = ?";
  
    db.query(sql, [bidToDelete], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ message: "Rows deleted successfully", affectedRows: result.affectedRows });
      }
    });
  });

  app.delete('/tbl_final_tree_spine/:bridge_id', (req, res) => {
    const bidToDelete = req.params.bridge_id;
    const sql = "DELETE FROM tbl_final_tree_spine WHERE bridge_id = ?";
  
    db.query(sql, [bidToDelete], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ message: "Rows deleted successfully", affectedRows: result.affectedRows });
      }
    });
  });


///////////// Post commands ////////////////////

app.post('/tbl_asset_spine', (req, res) => {
  const sql = "INSERT INTO tbl_asset_spine (name, structure_name, spans, description, organization, lon, lat, added_by_user,image, bridge_type, field1, location) VALUES (?)";
  const values = [
      req.body.name,
      req.body.structure_name,
      req.body.spans,
      req.body.description,
      req.body.organization,
      req.body.lon,
      req.body.lat,
      req.body.added_by_user,
      req.body.image,
      req.body.bridge_type,
      req.body.field1,
      req.body.location,
  ]
  db.query(sql, [values], (err, data) => {
      if(err) return res.json(err);
      return res.json(data);
  })
});
  
app.post('/tbl_initial_settings', (req, res) => {
    const sql = "INSERT INTO tbl_initial_settings (Bid, name, Survey_ID, Bridge_Type, Structure_Name, Main_Road, Span_Count, Abutment_Count, Set_Of_Columns,Arches_Count, Arches_Connectors, Lanes, Parapets_Count, Direction) VALUES (?)";
    const values = [
        req.body.Bid,
        req.body.name,
        req.body.Survey_ID,
        req.body.Bridge_Type,
        req.body.Structure_Name,
        req.body.Main_Road,
        req.body.Span_Count,
        req.body.Abutment_Count,
        req.body.Set_Of_Columns,
        req.body.Arches_Count,
        req.body.Arches_Connectors,
        req.body.Lanes,
        req.body.Parapets_Count,
        req.body.Direction,
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
});

app.post('/tbl_advanced_settings', (req, res) => {
    const dataArray = req.body;
    
    const query = `INSERT INTO tbl_advanced_settings (bridge_id, element_number, element_type1, element_type2, element_type2_quantity, element_type3, element_type3_quantity, element_type4, element_type4_quantity) VALUES ?`;
    const values = dataArray.map(item => [
        item.bridge_id,
        item.element_number,
        item.element_type1,
        item.element_type2,
        item.element_type2_quantity,
        item.element_type3,
        item.element_type3_quantity,
        item.element_type4,
        item.element_type4_quantity
      ]);
      db.query(query, [values], (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json({ success: true });
        }
      });
    });

// Insert the Directories Folders
app.post('/tbl_folders', (req, res) => {
     
    const sql1 = "INSERT INTO tbl_folders (Bid, General, Circles, Nadir, Sides, GuardRails, Angle_360, Thermal, To_Delete, Sub_Folders) VALUES (?)";
    const Directories_values = [
        req.body.Bid,
        req.body.General,
        req.body.Circles,
        req.body.Nadir,
        req.body.Sides,
        req.body.GuardRails,
        req.body.Angle_360,
        req.body.Thermal,
        req.body.To_Delete,
        req.body.Sub_Folders
    ]
    db.query(sql1, [Directories_values], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
});


app.post('/tbl_final_tree_spine', (req, res) => {
  const dataArray = req.body;
  
  const query = `INSERT INTO tbl_final_tree_spine (bridge_id, path_folder) VALUES ?`;
  const values = dataArray.map(item => [
      item.bridge_id,
      item.path_folder,
    ]);
    db.query(query, [values], (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json({ success: true });
      }
    });
  });
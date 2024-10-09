const express = require('express');
const mysql = require('mysql');
const cors  =require('cors');
const multer = require('multer');

// Configure multer storage
const storage = multer.memoryStorage(); // or configure diskStorage if you want to save files on disk

// Initialize multer with the configured storage
const upload = multer({ 
  storage, 
  limits: { fileSize: 1024 * 1024 * 10 }  // העלאת קובץ בגודל מקסימלי של 10MB
});

const app = express()
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"vm1.manam.co.il",
    user:'manam',
    password:'1122334455',
    database:'db_3dbia_11_studio'
});

/////////// LogIn ////////////////////////

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).json({ message: 'Missing username or password' });
  }

  const query = 'SELECT * FROM tbl_users WHERE email = ? AND password = ?';
  db.query(query, [username, password], (err, result) => {
      if (err) {
          return res.status(500).json({ message: 'Server error' });
      }

      if (result.length > 0) {
          return res.status(200).json({ message: 'Login successful', userId: result[0].id });
      } else {
          return res.status(401).json({ message: 'Invalid credentials' });
      }
  });
});

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

app.get('/tbl_asset_spine/:bid', (req,res) => {
  const bid = req.params.bid;
  const sql = "SELECT * FROM tbl_asset_spine WHERE bid = ? ";
  db.query(sql, [bid], (err, data) => {
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

app.get('/image/:bid', (req, res) => {
  const bid = req.params.bid;
  const sql = "SELECT image FROM tbl_asset_spine WHERE bid = ?";
  
  db.query(sql, [bid], (err, result) => {
      if (err || result.length === 0 || !result[0].image) {
          return res.status(404).sendFile('/path/to/default/image.png'); // In case there is no image or if there is an error
      }

      res.set('Content-Type', 'image/jpeg');  // Match the image type to the information coming from the server
      res.send(result[0].image);
  });
});

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

  app.delete('/tbl_asset_spine/:bridge_id', (req, res) => {
    const bidToDelete = req.params.bridge_id;
    const sql = "DELETE FROM tbl_asset_spine WHERE bid = ?";
  
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

app.post('/tbl_asset_spine', upload.single('image'), (req, res) => {
  console.log('Request body:', req.body);
  console.log('Uploaded file:', req.file);  // הדפסת מידע על הקובץ שהועלה

  const { name, structure_name, spans, description, organization, lon, lat, added_by_user, bridge_type, field1, location } = req.body;
  const image = req.file ? req.file.buffer : null;

  const lonValue = lon ? parseFloat(lon) : null;
  const latValue = lat ? parseFloat(lat) : null;

  const sql = "INSERT INTO tbl_asset_spine (name, structure_name, spans, description, organization, lon, lat, added_by_user, image, bridge_type, field1, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
      name,
      structure_name,
      spans,
      description,
      organization,
      lonValue,
      latValue,
      added_by_user,
      image,
      bridge_type,
      field1,
      location
  ];

  db.query(sql, values, (err, data) => {
      if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
      return res.status(200).json(data);
  });
});

app.post('/tbl_initial_settings', (req, res) => {
    const sql = "INSERT INTO tbl_initial_settings (Bid, name, Survey_ID, Bridge_Type, Structure_Name, Main_Road, Span_Count, Abutment_Count, Set_Of_Columns,Arches_Count, Arches_Connectors, Lanes, Parapets_Count, Direction, Unit) VALUES (?)";
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
        req.body.Unit,
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


  ///////////// Put commands ////////////////////

  app.put('/tbl_asset_spine/:bid', upload.single('image'), (req, res) => {
    const bid = req.params.bid;
    const { name, structure_name, spans, description, organization, lon, lat, bridge_type, field1, location } = req.body;

    const image = req.file ? req.file.buffer : null;

    const sql = `
        UPDATE tbl_asset_spine 
        SET 
            name = ?, 
            structure_name = ?, 
            spans = ?, 
            description = ?, 
            organization = ?, 
            lon = ?, 
            lat = ?, 
            bridge_type = ?, 
            field1 = ?, 
            location = ?, 
            image = ?
        WHERE bid = ?
    `;

    db.query(sql, [name, structure_name, spans, description, organization, lon, lat, bridge_type, field1, location, image, bid],
       (err, result) => {
        if (err) {
            console.error("Error updating asset:", err);
            return res.status(500).json({ error: "Error updating asset" });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Asset not found" });
        }

        res.json({ message: "Asset updated successfully" });
    });
});

  app.listen(8081, () => {
    console.log("Listening on port 8081...");
});
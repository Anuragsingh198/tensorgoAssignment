

import React, { useState } from 'react';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, Container, Typography } from '@mui/material';
import { Send, AlertCircle } from 'lucide-react';
import { CATEGORIES } from './Category';

export default function RequestForm({ onSubmit }) {
  const [category, setCategory] = useState('general');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ category, title, description });
    setTitle('');
    setDescription('');

  };

  return (
    <Container component="form" onSubmit={handleSubmit} style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h6" style={{ display: 'flex', alignItems: 'center' }}>
        <AlertCircle style={{ marginRight: '8px' }} /> Submit a Request
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select value={category} onChange={(e) => setCategory(e.target.value)} label="Category">
          {Object.entries(CATEGORIES).map(([value, label]) => (
            <MenuItem key={value} value={value}>{label}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="outlined"
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        variant="outlined"
        margin="normal"
        required
        multiline
        rows={4}
      />

      <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }} startIcon={<Send />}>
        Submit Request
      </Button>
    </Container>
  );
}

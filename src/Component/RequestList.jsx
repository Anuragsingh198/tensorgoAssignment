import React from 'react';
import { Card, CardContent, Typography, Button, Chip } from '@mui/material';
import { Clock, CheckCircle, AlertCircle, MessageCircle } from 'lucide-react';
import { CATEGORIES } from './Category';

export default function RequestList({ requests, selectedCategory }) {
  const filteredRequests = selectedCategory
    ? requests.filter((request) => request.category === selectedCategory)
    : requests;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open':
        return <AlertCircle style={{ color: 'orange' }} />;
      case 'in-progress':
        return <Clock style={{ color: 'blue' }} />;
      case 'resolved':
        return <CheckCircle style={{ color: 'green' }} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {filteredRequests.map((request) => (
        <Card key={request._id} style={{ marginBottom: '16px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <CardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <Typography variant="h6">{request.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  <MessageCircle style={{ marginRight: '8px' }} />
                  {CATEGORIES[request.category]}
                </Typography>
              </div>
              {/* <Chip
                label={request.status}
                color={request.status === 'resolved' ? 'success' : request.status === 'in-progress' ? 'primary' : 'default'}
                icon={getStatusIcon(request.status)}
              /> */}
            </div>
            <Typography variant="body1" style={{ marginTop: '12px', color: '#555' }}>
              {request.comments}
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '12px' }}>
              <span>Created: {new Date(request.createdAt).toLocaleDateString()}</span>
              {/* <span>Updated: {new Date(request.updatedAt).toLocaleDateString()}</span> */}
            </div>
          </CardContent>
        </Card>
      ))}

      {filteredRequests.length === 0 && (
        <Typography variant="h6" align="center" style={{ padding: '20px' }}>
          No requests found
        </Typography>
      )}
    </div>
  );
}

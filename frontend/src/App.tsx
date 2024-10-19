import { Route, Routes } from 'react-router-dom';
import Layout from './components/UI/Layout/Layout';
import { Typography } from '@mui/material';
import Register from './features/users/Register';
import Login from './features/users/Login';

const App = () => {
  return (
    <Layout>
      <Routes>
        {/*<Route path="/" element={<Photos />} />*/}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/*<Route path="/users/:id" element={<AuthorPhotos />} />*/}
        {/*<Route path="/add-new-photo" element={<PhotosForm />} />*/}

        <Route path="*" element={<Typography variant="h2">Not found!</Typography>} />
      </Routes>
    </Layout>
  );
};

export default App;

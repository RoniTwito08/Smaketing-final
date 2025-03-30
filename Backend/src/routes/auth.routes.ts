import express from 'express';
import { AuthService } from '../services/googleAds/auth.service';
import { googleAdsConfig } from '../config/google.config';

const router = express.Router();
const authService = new AuthService(googleAdsConfig);

router.get('/google/url', (req, res) => {
  try {
    const url = authService.generateAuthUrl();
    res.json({ url });
  } catch (error) {
    console.error('Error generating auth URL:', error);
    res.status(500).json({ error: 'Failed to generate auth URL' });
  }
});

router.get('/google/callback', async (req, res) => {
  try {
    const { code } = req.query;
    
    if (!code || typeof code !== 'string') {
      throw new Error('No code provided');
    }

    const { accessToken, refreshToken } = await authService.exchangeCodeForTokens(code);
    
    // Send a message to the opener window
    res.send(`
      <script>
        window.opener.postMessage({ type: 'GOOGLE_AUTH_SUCCESS', accessToken: '${accessToken}' }, '*');
        window.close();
      </script>
    `);
  } catch (error) {
    console.error('Error in OAuth callback:', error);
    res.status(500).send(`
      <script>
        window.opener.postMessage({ type: 'GOOGLE_AUTH_ERROR', error: 'Authentication failed' }, '*');
        window.close();
      </script>
    `);
  }
});

export default router; 
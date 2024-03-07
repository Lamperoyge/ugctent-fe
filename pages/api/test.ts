//@ts-ignore
import axios from 'axios';

const config = {
  ACTIVE_CAMPAIGN_API_KEY: process.env.ACTIVE_CAMPAIGN_KEY,
  ACTIVE_CAMPAIGN_URL: 'https://wonderverse35314.api-us1.com',
};

class ActiveCampaignClient {
  constructor() {
    (this as any).baseURL = `${config.ACTIVE_CAMPAIGN_URL}/api/3`;
    (this as any).client = axios.create({
      baseURL: (this as any).baseURL,
      timeout: 10000, // Set default timeout
      headers: { 'Api-Token': config.ACTIVE_CAMPAIGN_API_KEY },
    });
  }

  async get(url, params = {}) {
    try {
      const response = await (this as any).client.get(url, { params });
      return this._handleResponse(response);
    } catch (error) {
      this._handleError(error);
    }
  }

  async post(url, data = {}) {
    try {
      const response = await (this as any).client.post(url, data);
      return this._handleResponse(response);
    } catch (error) {
      this._handleError(error);
    }
  }

  _handleResponse(response) {
    if ([200, 201].includes(response.status)) {
      return response.data;
    } else {
      throw new Error('Unexpected response status: ' + response.status);
    }
  }

  _handleError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log('Data', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.log('Request', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  }

  async getContactByEmail(email) {
    try {
      const response = await this.get(`/contacts?filters[email]=${email}`);
      if (response.contacts && response.contacts.length > 0) {
        return response.contacts[0];
      } else {
        return this.addContact(email);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addTagToEmailUser(email, tag) {
    const contact = await this.getContactByEmail(email);
    console.log(contact, 'CONTACT');
    if (!contact) return;
    const contactId = contact.id;
    if (contactId) {
      this._addTagToContact(contactId, tag);
    }
  }

  async _addTagToContact(contactId, tag) {
    const tagData = {
      contactTag: {
        contact: contactId,
        tag: tag,
      },
    };
    await this.post('/contactTags', tagData);
  }

  async addContact(email, tag = null) {
    try {
      const data = { contact: { email: email } };
      const response = await this.post('/contacts', data);
      const contact = response.contact || {};
      const contactId = contact.id;
      if (contactId && tag) {
        await this._addTagToContact(contactId, tag);
      }
      return contact;
    } catch (error) {
      console.log(error);
    }
  }
}

const activeCampaignClient = new ActiveCampaignClient();

export default async function handler(req, res) {
  const { email, tag } = {
    email: 'admin@admin.com',
    tag: 'trial',
  };

  try {
    await activeCampaignClient.addTagToEmailUser(email, tag);
    res.status(200).json({ message: 'Contact added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

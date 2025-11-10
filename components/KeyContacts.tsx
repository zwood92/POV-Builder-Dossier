import React from 'react';
import type { KeyContact } from '../types';

interface KeyContactsProps {
  contacts: KeyContact[];
}

const KeyContacts: React.FC<KeyContactsProps> = ({ contacts }) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-slate-800 mb-4">Key Contacts</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {contacts.map((contact, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{contact.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{contact.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  <a href={`mailto:${contact.email}`} className="text-blue-600 hover:text-blue-800">{contact.email}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KeyContacts;

'use client';

import { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import axios from 'axios';
import { htmlToText } from 'html-to-text';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Conference = {
  id: number;
  name: string;
  slug: string;
};

interface Paper {
  paper_title: string;
  abstract: string;
  keywords: string
}

type DownloadButtonProps = {
  userId: number;
};

const DownloadButton: React.FC<DownloadButtonProps> = ({ userId }) => {
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [selectedConference, setSelectedConference] = useState<number | null>(null);
  const [templateFile, setTemplateFile] = useState<File | null>(null);

    useEffect(() => {
      const fetchConferences = async () => {
        try {
          const response = await axios.get(`/api/conferences/${userId}`);
          setConferences(response.data);
        } catch (error) {
          console.error('Failed to fetch conferences', error);
          alert('Error fetching conferences.');
        }
      };
      fetchConferences();
    }, [userId]);

    const handleTemplateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      setTemplateFile(file);
    };

    const handleDownload = async () => {
    if (!selectedConference) {
      toast.warning('Please select a conference');
      return;
    }

    if (!templateFile) {
      alert('Please upload a template file');
      return;
    }

    try {
      // Fetch papers from the API
      const response = await axios.get(`/api/downloadabstract?conferenceId=${selectedConference}`);
      const papers: Paper[] = response.data;

      if (!Array.isArray(papers)) {
        console.error('Unexpected papers format:', papers);
        alert('Error processing papers data.');
        return;
      }

      const conference = conferences.find((c) => c.id === selectedConference);
      let filename = 'papers.docx';
      if (conference) {
        filename = `${conference.slug}.docx`;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const arrayBuffer = event.target?.result;

        if (arrayBuffer) {
          try {
            const zip = new PizZip(arrayBuffer as ArrayBuffer);
            const doc = new Docxtemplater(zip, {
              paragraphLoop: true,
              linebreaks: true,
            });

            const data = {
              papers: papers.map((paper) => ({
                paper_title: paper.paper_title.toUpperCase(),
                abstract: htmlToText(paper.abstract),
                keywords: paper.keywords,
                page_break: true,
              })),
            };

            doc.setData(data);
            doc.render();

            const blob = doc.getZip().generate({
              type: 'blob',
              mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            });
            saveAs(blob, filename);
          } catch (processingError) {
            console.error('Error processing document:', processingError);
            alert('Processing Error: ' + (processingError instanceof Error ? processingError.message : 'Unknown error'));
          }
        }
      };

      reader.readAsArrayBuffer(templateFile);
    } catch (downloadError) {
      console.error('Failed to download document:', downloadError);
      alert('Download Error: ' + (downloadError instanceof Error ? downloadError.message : 'Unknown error'));
    }
  };
  
    const handleDownloadTemplate = () => {
      axios.get('/uploads/templates/example_template.docx', { responseType: 'blob' })
        .then(response => {
          const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
          saveAs(blob, 'example_template.docx');
        })
        .catch(error => {
          console.error('Error downloading template:', error);
          alert('Error downloading template.');
        });
    };

  return (
    <div className="flex-1">
      <label htmlFor="conference" className="block text-sm font-medium text-gray-700 mb-2">
        Select Conference
      </label>
      <select
        id="conference"
        name="conference"
        className="block w-full pl-4 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-950 focus:border-blue-950 sm:text-sm rounded-lg bg-white shadow-sm"
        onChange={(e) => setSelectedConference(Number(e.target.value))}
        value={selectedConference || ''}
      >
        <option value="">Select a Conference</option>
        {conferences.length > 0 ? (
          conferences.map((conference) => (
            <option key={conference.id} value={conference.id}>
              {conference.name}
            </option>
          ))
        ) : (
          <option value="">No conferences available</option>
        )}
      </select>

      <label htmlFor="template" className="block text-sm font-medium text-gray-700 mt-4 mb-2">
        Upload Template
      </label>
      <input
        type="file"
        id="template"
        accept=".docx"
        className="file-input file-input-bordered w-full bg-white h-10"
        onChange={handleTemplateUpload}
        style={{
          height: '36px',
        }}
      />

     <button
        onClick={handleDownloadTemplate}
        className="mt-4 px-3 py-1.5 mr-2 bg-blue-950 text-white rounded-full hover:bg-orange-500 text-sm"
      >
        Example Template
      </button>

      <button
        onClick={handleDownload}
        className="mt-4 px-3 py-1.5 bg-blue-950 text-white rounded-full hover:bg-orange-500 text-sm"
      >
        Download Abstract
      </button>

    </div>
  );
};

export default DownloadButton;

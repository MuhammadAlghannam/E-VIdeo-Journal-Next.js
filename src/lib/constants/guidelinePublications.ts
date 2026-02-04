export interface GuidelineSection {
  id: string;
  title: string;
  content: {
    type: 'text' | 'list' | 'subsections';
    data: string | string[] | SubSection[];
  };
}

export interface SubSection {
  title: string;
  content: string | string[];
}

export const guidelinePublications: GuidelineSection[] = [
  {
    id: 'categories',
    title: 'Categories of Submissions (must be related to Hypospadias)',
    content: {
      type: 'list',
      data: [
        'Basic science',
        'Original research',
        'Operative video',
        'Education & Training',
        'Review articles'
      ]
    }
  },
  {
    id: 'abstract-requirements',
    title: 'Abstract Submission Requirements',
    content: {
      type: 'subsections',
      data: [
        {
          title: 'Word Limit:',
          content: 'Abstracts must be less than 350 words.'
        },
        {
          title: 'Topics:',
          content: 'The topic must be related to HYPOSPADIAS: e.g. Basic science, clinical, operative'
        },
        {
          title: 'Content:',
          content: [
            'Separate Title page including the name of the authors and their affiliation',
            'Title',
            'Objectives of the presentation',
            'Patients & methods',
            'Results',
            'Discussion',
            'Conclusion',
            'References (most important and relevant, not more than 20 references, in a separate page)',
            '5-12 keywords'
          ]
        },
        {
          title: 'Language:',
          content: 'English.'
        },
        {
          title: 'Formatting:',
          content: 'Abstracts must be submitted as bullet points.'
        }
      ]
    }
  },
  {
    id: 'video-requirements',
    title: 'For the subsequent Video PowerPoint presentation',
    content: {
      type: 'subsections',
      data: [
        {
          title: 'Video Format:',
          content: 'Accepted file formats include MP4.'
        },
        {
          title: 'Video Length:',
          content: '4 categories: 5, 10, 15, 20 minutes in length.'
        },
        {
          title: 'PowerPoint Slides:',
          content: 'Ensure that the slides are clear, concise, and well-organized to accompany the spoken content.'
        },
        {
          title: 'The first PowerPoint slide should include:',
          content: [
            'The title of the video',
            'The authors with the video presenter as the first author',
            'The affiliations of the authors'
          ]
        },
        {
          title: 'The second slide must include:',
          content: [
            'Ethics committee approval number',
            'Conflict of interest',
            'Use of AI in preparation of the study'
          ]
        },
        {
          title: 'Audio Quality:',
          content: 'Ensure that the audio is clear and free of distractions. High-quality narration is essential.'
        },
        {
          title: 'File Size:',
          content: 'The total file size for both the abstract and video must not exceed 1000MB.'
        },
        {
          title: 'Submission Format:',
          content: 'Your paper should be submitted as a video with audio. PowerPoint slides with audio can be exported to video using this guide.'
        }
      ]
    }
  },
  {
    id: 'submission-process',
    title: 'Submission Process',
    content: {
      type: 'subsections',
      data: [
        {
          title: 'Step 1 - Abstract Submission:',
          content: [
            'Submit your abstract via the E-Journal\'s submission portal [link to portal].',
            'Include the title of your presentation, authors\' names, and affiliations.',
            'Select the appropriate thematic category for your submission.'
          ]
        },
        {
          title: 'Step 2 - Video Submission (Upon Abstract Acceptance):',
          content: [
            'If your abstract is accepted, you will be invited to submit your video presentation.',
            'The abstract and the video will be assessed by 2-3 peer reviewers.',
            'Note that acceptance of the abstract does not guarantee acceptance of the video.',
            'If your abstract is accepted, the video submission should follow within 30 days.',
            'Only accepted videos by the reviewers and editor will be available at the HIS Video Journal link'
          ]
        }
      ]
    }
  },
  {
    id: 'important-notes',
    title: 'Important Notes',
    content: {
      type: 'subsections',
      data: [
        {
          title: 'Originality:',
          content: 'All submitted work must be original.'
        },
        {
          title: 'Conflicts of Interest:',
          content: 'Authors must disclose any potential conflicts of interest in their submissions.'
        },
        {
          title: 'Patient Data:',
          content: 'If your paper includes patient images or data, please provide details of the institutional review board approval. Alternatively, for case reports, please provide a statement that you hold a signed publication consent from the patient.'
        },
        {
          title: 'Permissions:',
          content: 'Ensure you have obtained permission for any third-party materials (e.g., images, videos) used in your presentation.'
        },
        {
          title: 'Technical Support:',
          content: 'For any technical issues with your Video submission, please contact assistant@hypospadias-society.com.'
        }
      ]
    }
  }
];

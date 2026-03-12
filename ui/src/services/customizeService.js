import { API_BASE_URL, API_CUSTOMIZE, API_QUICK_CUSTOMIZE } from '../constants/api';

export async function customizeResume({ resumeData, formData, saveToDb }) {
	const endpoint = saveToDb ? API_CUSTOMIZE : API_QUICK_CUSTOMIZE;
	const response = await fetch(`${API_BASE_URL}${endpoint}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			resume_data: resumeData,
			job_title: formData.jobTitle,
			job_company: formData.jobCompany,
			job_description: formData.jobDescription,
			job_requirements: formData.jobRequirements
		}),
	});
	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.error || 'Failed to customize resume');
	}
	return data;
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// This component displays information about a class given its ID
export default function ClassComponent({ id, setAllowedAlignments }) {
  const [classDetails, setClassDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    axios
      .get(`http://localhost:8000/fetch-class/${id}/`)
      .then((response) => {
        setClassDetails(response.data);

        // ✅ Pass alignments up to parent
        if (setAllowedAlignments) {
          const alignments = Array.isArray(response.data.allowed_alignments) && response.data.allowed_alignments.length > 0
            ? response.data.allowed_alignments
            : ['ANY']; // Fallback if empty
          setAllowedAlignments(alignments);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching class details:', err);
        setError('Failed to load class details.');
        setLoading(false);
      });
  }, [id, setAllowedAlignments]);

  if (loading) return <div>Loading class details...</div>;
  if (error) return <div>{error}</div>;
  if (!classDetails) return <div>No class details available</div>;

  const allowedAlignments =
    Array.isArray(classDetails.allowed_alignments) && classDetails.allowed_alignments.length > 0
      ? classDetails.allowed_alignments.join(', ')
      : 'ANY';

  const classSkills =
    Array.isArray(classDetails.class_skills) && classDetails.class_skills.length > 0
      ? classDetails.class_skills.join(', ')
      : 'N/A';

  return (
    <div>
      <h2>{classDetails.name}</h2>

      <h3>Details:</h3>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        <li><strong>Hit Die: {classDetails.hit_die} + Con modifier</strong></li>
        <li><strong>Skill Points: {classDetails['skill points']} + Int modifier</strong></li>
        <li><strong>Class Skills: {classSkills}</strong></li>
        <li><strong>Allowed Alignments: {allowedAlignments}</strong></li>
      </ul>

      <h3>Description:</h3>
      <p>{classDetails.description}</p>
    </div>
  );
}
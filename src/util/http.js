import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function createAccount({ user }) {
  const response = await fetch("https://setprojectsbackend-production.up.railway.app/user/signup", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create new account.");
  }

  const reqRes = await response.json();
  return reqRes;
}

export async function login({ user }) {
  const response = await fetch("https://setprojectsbackend-production.up.railway.app/user/login", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to login.");
  }

  const reqRes = await response.json();
  return reqRes;
}

export async function getProjects({ token }) {
  const response = await fetch("https://setprojectsbackend-production.up.railway.app/projects", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch projects data");
  }

  const reqRes = await response.json();
  return reqRes;
}

export async function createProject({ projectData, token }) {
  const response = await fetch("https://setprojectsbackend-production.up.railway.app/project/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    method: "POST",
    body: JSON.stringify(projectData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to add project task");
  }

  const reqRes = await response.json();
  return reqRes;
}

export async function getProject({ projectId, token }) {
  const response = await fetch("https://setprojectsbackend-production.up.railway.app/projects/" + projectId, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch project data");
  }

  const reqRes = await response.json();
  return reqRes;
}

export async function deleteProject({ projectId, token }) {
  const response = await fetch("https://setprojectsbackend-production.up.railway.app/projects/" + projectId, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete project task");
  }

  const reqRes = await response.json();
  return reqRes;
}

export async function addTask({ projectId, taskData, token }) {
  const response = await fetch(
    "https://setprojectsbackend-production.up.railway.app/projects/" + projectId + "/task",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      method: "POST",
      body: JSON.stringify(taskData),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to add project task");
  }

  const reqRes = await response.json();
  return reqRes;
}

export async function deleteTask({ projectId, taskId, token }) {
  const response = await fetch(
    "https://setprojectsbackend-production.up.railway.app/projects/" + projectId + "/tasks/" + taskId,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete project task");
  }

  const reqRes = await response.json();
  return reqRes;
}

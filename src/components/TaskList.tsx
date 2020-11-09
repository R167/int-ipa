import React from "react";

import { Box, Button, Grid, Paper, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

interface TaskInfo {
  name: string;
  description: string;
  file: string;
  hidden?: boolean;
}

interface Props {
  tasks: TaskInfo[];
  path: string;
}

const taskLink = (path: string, file: string) => `${path}/${file.replace(".yaml", "")}`;

const TaskList = (props: Props) => {
  const { tasks, path } = props;

  if (tasks.length === 0) {
    return <Typography>No tasks to do</Typography>;
  } else {
    return (
      <Grid container spacing={4}>
        {tasks.map(
          (task, i) =>
            !task.hidden && (
              <Grid item key={`tasklist-${i}`} lg={6} xs={12}>
                <Box
                  component={Paper}
                  p={2}
                  height="100%"
                  display="flex"
                  alignContent="space-between"
                  alignItems="flex-start"
                  flexWrap="wrap"
                >
                  <Box>
                    <Typography color="secondary" gutterBottom>
                      {task.name}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {task.description}
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="flex-end" alignItems="flex-end" width="100%">
                    <Button
                      component={Link}
                      color="primary"
                      variant="contained"
                      to={taskLink(path, task.file)}
                    >
                      Work on task
                    </Button>
                  </Box>
                </Box>
              </Grid>
            )
        )}
      </Grid>
    );
  }
};

export default TaskList;

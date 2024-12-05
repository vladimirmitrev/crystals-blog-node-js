import { useContext, useEffect, useMemo, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useFormik } from 'formik';
import * as Yup from 'yup';

import AuthContext from "../../../../contexts/authContext";
// import useForm from "../../../../hooks/useForm";
import styles from './CrystalComments.module.css';


import * as commentService from '../../../../services/commentService';
import reducer from "./commentReducer";
import { NotificationContext, types } from '../../../../contexts/NotificationContext';
// import Path from "../../../../paths";
// import { pathToUrl } from "../../../../utils/pathUtils";

const CrystalComments = () => {
    const { crystalId } = useParams();
    const { loggedUserId, email, name, isAuthenticated  } = useContext(AuthContext);
    const [comments, dispatch] = useReducer(reducer, []);
    const { showNotification } = useContext(NotificationContext);
    // const navigate = useNavigate();


    // useEffect(() => {
    //     commentService.getAll(crystalId)
    //         .then((result) => {
    //             dispatch({
    //                 type: 'GET_ALL_COMMENTS',
    //                 payload: result,
    //             })
    //         });
    // }, [crystalId]);
    useEffect(() => {
      const fetchAllComments = async () => {
          try {
              const response = await commentService.getAll(crystalId);
              console.log(response);
              dispatch({
                type: 'GET_ALL_COMMENTS',
                payload: response.data.comments,
            })
              // setAllCrystals(response.data.crystals);
          } catch (error) {
              console.error('Error fetching comments:', error);
          }
      };
      fetchAllComments();
  }, [crystalId]);

    const formik = useFormik({
      initialValues: {
        text: '',
      },
      validationSchema: Yup.object({
        text: Yup.string()
          .trim()
          .min(6, 'Comment should be at least 6 characters')
          .max(256, 'Comment should be no longer than 256 characters')
          .required('Required')
      
      }),
      onSubmit: async (values) => {
          // const commentsData = values;
          try {
            const newComment = await commentService.create(
              crystalId,
              values.text,
              loggedUserId
           );
  
           newComment.data.createdComment.owner = { email, name };
          dispatch({
              type: 'ADD_COMMENT',
              payload: newComment.data.createdComment
          })
          values.text = '';
              showNotification('You successfully added a new comment!', types.success);
          } catch (err) {
              showNotification(err.message, types.error);
          }
      },
    });
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
        return formattedDate;
    };

  return (
    <>
      <div className={styles.commentsDiv}>
      <h5>Comments from users ({comments.length}):</h5>
        <ul className={styles.commentsUl}>
          {comments?.map(({ _id, text, owner: { email, name }, createdAt }) => (
            <li key={_id} className={styles.commentLi}>
              <p className={styles.date}>{formatDate(createdAt)}</p>
              <p className={styles.commentP}>
                {name ? name : email?.split('@')[0]}: <span className={styles.commentText}>{text}</span>
              </p>
            </li>
          ))}
        </ul>
        {comments.length === 0 && <p className="no-comment">No comments.</p>}
      </div>

      {isAuthenticated && (
        <form onSubmit={formik.handleSubmit}>
            <div className="col-xl-6 col-md-8 col-sm-12">
                <div className="form-floating">
                    <input
                    type="text"
                    className="form-control"
                    id="text"
                    placeholder="Comment"
                    name="text"
                    onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                    value={formik.values.text}
                    />
                    <label htmlFor="text">New comment</label>
                    {formik.errors.text ? (
                    <p className={styles.inputError}>{formik.errors.text}</p>
                    ) : null}
                    <button className={`btn btn-info w-100 py-3 mt-2 ${styles.addCommentBtn}`} type="submit">
                    Add comment
                    </button>
                </div>
            </div>
        </form>
      )}      
    </>
  );
};

export default CrystalComments;

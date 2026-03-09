function PostSkeleton() {
  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        background: "white",
      }}
    >
      {/* title */}
      <div
        style={{
          height: "20px",
          width: "60%",
          background: "#e2e8f0",
          borderRadius: "4px",
          marginBottom: "0.75rem",
        }}
      ></div>

      {/* body line 1 */}
      <div
        style={{
          height: "14px",
          width: "100%",
          background: "#e2e8f0",
          borderRadius: "4px",
          marginBottom: "0.5rem",
        }}
      ></div>

      {/* body line 2 */}
      <div
        style={{
          height: "14px",
          width: "85%",
          background: "#e2e8f0",
          borderRadius: "4px",
        }}
      ></div>
    </div>
  );
}

export default PostSkeleton;

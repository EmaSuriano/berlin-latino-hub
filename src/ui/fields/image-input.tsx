// "use client";

// import { EventComponent } from "@/lib/form";


// export const ImageUpload: EventComponent = ({ name, errors, onChange }) => {
//   return (
//     <div className="mb-4">
//       <label htmlFor={name} className="mb-2 block text-sm font-medium">
//         {name}
//       </label>
//       <div className="relative mt-2 rounded-md">
//         <div className="relative">
//           <input
//             type="file"
//             id={name}
//             name={name}
//             accept="image/*"
//             onChange={onChange}
//             className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-gray-800"
//             aria-describedby={`${name}-error`}
//             required
//           />
          
//         </div>
//       </div>

//       {errors ? (
//         <div
//           id={`${name}-error`}
//           aria-live="polite"
//           className="mt-2 text-sm text-red-500"
//         >
//           {errors.join(", ")}
//         </div>
//       ) : null}
//     </div>
//   );
// };

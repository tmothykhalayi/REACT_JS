import { useForm } from '@tanstack/react-form'
import { z } from 'zod'

// Zod schema for form validation
const formSchema = z.object({
    employeeId: z
        .string()
        .min(1, 'First name must be at least 1 characters')
        .max(10, 'First name must be less than 50 characters'),
    fullName: z
        .string()
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name must be less than 50 characters'),
    email: z
        .string()
        .email('Please enter a valid email address')
        .min(1, 'Email is required'),
    department: z
        .string()
        .min(1, 'Department is required'),
    position: z
        .string()
        .min(1, 'Position is required'),

    joiningDate: z
        .string()
        .min(1, 'Joining date is required'),
    salary: z
        .string()
        .min(1, 'Salary is required'),
    agreeToTerms: z
        .boolean()
        .refine(val => val === true, 'You must agree to the terms and conditions'),
})

type FormData = z.infer<typeof formSchema>

// Helper function to validate with Zod
const validateField = <T,>(value: T, schema: z.ZodType<T>) => {
    const result = schema.safeParse(value)
    if (!result.success) {
        return result.error.issues[0]?.message || 'Validation error'
    }
    return undefined
}

function TanstackForm() {
    const form = useForm({
        defaultValues: {
            employeeId: '',
            fullName: '',
            email: '',
            department: '',
            position: '',
            joiningDate: '',
            salary: '',
            agreeToTerms: false,
        } as FormData,
        onSubmit: async ({ value }) => {
            const result = formSchema.safeParse(value)
            if (!result.success) {
                console.error('Validation failed:', result.error.issues)
                return
            }
            console.log('Form submitted successfully:', value)
            alert('Form submitted successfully!')
            form.reset()
        },
    })

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                Employee Details Form
            </h2>

            <form onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                void form.handleSubmit()
            }}
                className="space-y-4">
                
                <form.Field
                    name="employeeId"
                    validators={{
                        onChange: ({ value }) => validateField(value, formSchema.shape.employeeId),
                        onBlur: ({ value }) => validateField(value, formSchema.shape.employeeId),
                    }}>
                    {(field) => (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Employee ID
                            </label>
                            <input
                                type="number"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {field.state.meta.errors && (
                                <div className="text-red-500 text-sm mt-1">
                                    {field.state.meta.errors.join(', ')}
                                </div>
                            )}
                        </div>
                    )}
                </form.Field>

                <form.Field
                    name="fullName"
                    validators={{
                        onChange: ({ value }) => validateField(value, formSchema.shape.fullName),
                        onBlur: ({ value }) => validateField(value, formSchema.shape.fullName),
                    }}>
                    {(field) => (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {field.state.meta.errors && (
                                <div className="text-red-500 text-sm mt-1">
                                    {field.state.meta.errors.join(', ')}
                                </div>
                            )}
                        </div>
                    )}
                </form.Field>

                <form.Field
                    name="email"
                    validators={{
                        onChange: ({ value }) => validateField(value, formSchema.shape.email),
                        onBlur: ({ value }) => validateField(value, formSchema.shape.email),
                    }}>
                    {(field) => (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {field.state.meta.errors && (
                                <div className="text-red-500 text-sm mt-1">
                                    {field.state.meta.errors.join(', ')}
                                </div>
                            )}
                        </div>
                    )}
                </form.Field>

                <form.Field
                    name="department"
                    validators={{
                        onChange: ({ value }) => validateField(value, formSchema.shape.department),
                        onBlur: ({ value }) => validateField(value, formSchema.shape.department),
                    }}>
                    {(field) => (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Department
                            </label>
                            <input
                                type="text"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {field.state.meta.errors && (
                                <div className="text-red-500 text-sm mt-1">
                                    {field.state.meta.errors.join(', ')}
                                </div>
                            )}
                        </div>
                    )}
                </form.Field>

                <form.Field
                    name="position"
                    validators={{
                        onChange: ({ value }) => validateField(value, formSchema.shape.position),
                        onBlur: ({ value }) => validateField(value, formSchema.shape.position),
                    }}>
                    {(field) => (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Position
                            </label>
                            <input
                                type="text"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {field.state.meta.errors && (
                                <div className="text-red-500 text-sm mt-1">
                                    {field.state.meta.errors.join(', ')}
                                </div>
                            )}
                        </div>
                    )}
                </form.Field>

                <form.Field
                    name="joiningDate"
                    validators={{
                        onChange: ({ value }) => validateField(value, formSchema.shape.joiningDate),
                        onBlur: ({ value }) => validateField(value, formSchema.shape.joiningDate),
                    }}>
                    {(field) => (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Joining Date
                            </label>
                            <input
                                type="date"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {field.state.meta.errors && (
                                <div className="text-red-500 text-sm mt-1">
                                    {field.state.meta.errors.join(', ')}
                                </div>
                            )}
                        </div>
                    )}
                </form.Field>

                <form.Field
                    name="salary"
                    validators={{
                        onChange: ({ value }) => validateField(value, formSchema.shape.salary),
                        onBlur: ({ value }) => validateField(value, formSchema.shape.salary),
                    }}>
                    {(field) => (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Salary
                            </label>
                            <input
                                type="number"
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.value)}
                                onBlur={field.handleBlur}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            {field.state.meta.errors && (
                                <div className="text-red-500 text-sm mt-1">
                                    {field.state.meta.errors.join(', ')}
                                </div>
                            )}
                        </div>
                    )}
                </form.Field>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    disabled={!form.state.canSubmit}
                >
                    Submit Employee Details
                </button>
            </form>
        </div>
    )
}

export default TanstackForm

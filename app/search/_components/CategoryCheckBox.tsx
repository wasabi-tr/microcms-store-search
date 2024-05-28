'use client'
import { useCallback } from 'react'
import { Route } from 'next'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Categories } from '@/app/search/types'

const CategoryCheckBox = ({ categories }: { categories: Categories[] }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams)
      const value = e.target.value

      const selectedCategories = new Set(params.get('categories')?.split(',') || [])

      if (selectedCategories.has(value)) {
        selectedCategories.delete(value)
      } else {
        selectedCategories.add(value)
      }

      if (selectedCategories.size === 0) {
        params.delete('categories')
      } else {
        params.set('categories', Array.from(selectedCategories).join(','))
      }

      replace(`${pathname}?${params.toString()}` as Route)
    },
    [searchParams, pathname, replace]
  )

  return (
    <fieldset>
      <div className="grid gap-2">
        <legend className="font-bold">カテゴリーで絞り込む</legend>
        <div className="flex flex-col space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={category.id}
                className="peer h-4 w-4 shrink-0 rounded-sm border border-primary "
                id={category.id}
                onChange={handleCheck}
                defaultChecked={searchParams.get('categories')?.split(',').includes(category.id)}
              />
              <div className="text-sm">
                <label className="font-medium" htmlFor={category.id}>
                  {category.title}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </fieldset>
  )
}

export default CategoryCheckBox

"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  title?: string;
  description?: string;
  className?: string;
}

export function ContactForm({
  title = "联系我们",
  description = "填写下面的表单，我们会尽快回复您。",
  className,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: 实际的表单提交逻辑
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={cn("py-16 px-6", className)}>
        <div className="container mx-auto max-w-2xl text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8">
            <div className="text-green-600 text-5xl mb-4">✓</div>
            <h3 className="text-2xl font-semibold text-green-800 mb-2">
              提交成功
            </h3>
            <p className="text-green-700">
              感谢您的留言，我们会尽快与您联系！
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={cn("py-16 px-6 bg-muted/30", className)}>
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              姓名
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="请输入您的姓名"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              邮箱
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="请输入您的邮箱"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              留言内容
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              placeholder="请输入您想说的话..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground h-11 px-8 rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "提交中..." : "提交"}
          </button>
        </form>
      </div>
    </section>
  );
}

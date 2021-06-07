.class Lcom/google/android/material/internal/a;
.super La/g/i/a;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingMethod;
    value = Lcom/google/android/material/internal/CheckableImageButton;-><init>(Landroid/content/Context;Landroid/util/AttributeSet;I)V
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic c:Lcom/google/android/material/internal/CheckableImageButton;


# direct methods
.method constructor <init>(Lcom/google/android/material/internal/CheckableImageButton;)V
    .locals 0

    iput-object p1, p0, Lcom/google/android/material/internal/a;->c:Lcom/google/android/material/internal/CheckableImageButton;

    invoke-direct {p0}, La/g/i/a;-><init>()V

    return-void
.end method


# virtual methods
.method public a(Landroid/view/View;La/g/i/a/c;)V
    .locals 0

    invoke-super {p0, p1, p2}, La/g/i/a;->a(Landroid/view/View;La/g/i/a/c;)V

    const/4 p1, 0x1

    invoke-virtual {p2, p1}, La/g/i/a/c;->a(Z)V

    iget-object p1, p0, Lcom/google/android/material/internal/a;->c:Lcom/google/android/material/internal/CheckableImageButton;

    invoke-virtual {p1}, Lcom/google/android/material/internal/CheckableImageButton;->isChecked()Z

    move-result p1

    invoke-virtual {p2, p1}, La/g/i/a/c;->b(Z)V

    return-void
.end method

.method public b(Landroid/view/View;Landroid/view/accessibility/AccessibilityEvent;)V
    .locals 0

    invoke-super {p0, p1, p2}, La/g/i/a;->b(Landroid/view/View;Landroid/view/accessibility/AccessibilityEvent;)V

    iget-object p1, p0, Lcom/google/android/material/internal/a;->c:Lcom/google/android/material/internal/CheckableImageButton;

    invoke-virtual {p1}, Lcom/google/android/material/internal/CheckableImageButton;->isChecked()Z

    move-result p1

    invoke-virtual {p2, p1}, Landroid/view/accessibility/AccessibilityEvent;->setChecked(Z)V

    return-void
.end method

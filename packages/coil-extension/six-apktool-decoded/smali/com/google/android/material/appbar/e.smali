.class Lcom/google/android/material/appbar/e;
.super Landroidx/coordinatorlayout/widget/CoordinatorLayout$b;
.source ""


# annotations
.annotation system Ldalvik/annotation/Signature;
    value = {
        "<V:",
        "Landroid/view/View;",
        ">",
        "Landroidx/coordinatorlayout/widget/CoordinatorLayout$b<",
        "TV;>;"
    }
.end annotation


# instance fields
.field private a:Lcom/google/android/material/appbar/f;

.field private b:I

.field private c:I


# direct methods
.method public constructor <init>()V
    .locals 1

    invoke-direct {p0}, Landroidx/coordinatorlayout/widget/CoordinatorLayout$b;-><init>()V

    const/4 v0, 0x0

    iput v0, p0, Lcom/google/android/material/appbar/e;->b:I

    iput v0, p0, Lcom/google/android/material/appbar/e;->c:I

    return-void
.end method

.method public constructor <init>(Landroid/content/Context;Landroid/util/AttributeSet;)V
    .locals 0

    invoke-direct {p0, p1, p2}, Landroidx/coordinatorlayout/widget/CoordinatorLayout$b;-><init>(Landroid/content/Context;Landroid/util/AttributeSet;)V

    const/4 p1, 0x0

    iput p1, p0, Lcom/google/android/material/appbar/e;->b:I

    iput p1, p0, Lcom/google/android/material/appbar/e;->c:I

    return-void
.end method


# virtual methods
.method public a(I)Z
    .locals 1

    iget-object v0, p0, Lcom/google/android/material/appbar/e;->a:Lcom/google/android/material/appbar/f;

    if-eqz v0, :cond_0

    invoke-virtual {v0, p1}, Lcom/google/android/material/appbar/f;->b(I)Z

    move-result p1

    return p1

    :cond_0
    iput p1, p0, Lcom/google/android/material/appbar/e;->b:I

    const/4 p1, 0x0

    return p1
.end method

.method public a(Landroidx/coordinatorlayout/widget/CoordinatorLayout;Landroid/view/View;I)Z
    .locals 0
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(",
            "Landroidx/coordinatorlayout/widget/CoordinatorLayout;",
            "TV;I)Z"
        }
    .end annotation

    invoke-virtual {p0, p1, p2, p3}, Lcom/google/android/material/appbar/e;->b(Landroidx/coordinatorlayout/widget/CoordinatorLayout;Landroid/view/View;I)V

    iget-object p1, p0, Lcom/google/android/material/appbar/e;->a:Lcom/google/android/material/appbar/f;

    if-nez p1, :cond_0

    new-instance p1, Lcom/google/android/material/appbar/f;

    invoke-direct {p1, p2}, Lcom/google/android/material/appbar/f;-><init>(Landroid/view/View;)V

    iput-object p1, p0, Lcom/google/android/material/appbar/e;->a:Lcom/google/android/material/appbar/f;

    :cond_0
    iget-object p1, p0, Lcom/google/android/material/appbar/e;->a:Lcom/google/android/material/appbar/f;

    invoke-virtual {p1}, Lcom/google/android/material/appbar/f;->b()V

    iget p1, p0, Lcom/google/android/material/appbar/e;->b:I

    const/4 p2, 0x0

    if-eqz p1, :cond_1

    iget-object p3, p0, Lcom/google/android/material/appbar/e;->a:Lcom/google/android/material/appbar/f;

    invoke-virtual {p3, p1}, Lcom/google/android/material/appbar/f;->b(I)Z

    iput p2, p0, Lcom/google/android/material/appbar/e;->b:I

    :cond_1
    iget p1, p0, Lcom/google/android/material/appbar/e;->c:I

    if-eqz p1, :cond_2

    iget-object p3, p0, Lcom/google/android/material/appbar/e;->a:Lcom/google/android/material/appbar/f;

    invoke-virtual {p3, p1}, Lcom/google/android/material/appbar/f;->a(I)Z

    iput p2, p0, Lcom/google/android/material/appbar/e;->c:I

    :cond_2
    const/4 p1, 0x1

    return p1
.end method

.method public b()I
    .locals 1

    iget-object v0, p0, Lcom/google/android/material/appbar/e;->a:Lcom/google/android/material/appbar/f;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, Lcom/google/android/material/appbar/f;->a()I

    move-result v0

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return v0
.end method

.method protected b(Landroidx/coordinatorlayout/widget/CoordinatorLayout;Landroid/view/View;I)V
    .locals 0
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(",
            "Landroidx/coordinatorlayout/widget/CoordinatorLayout;",
            "TV;I)V"
        }
    .end annotation

    invoke-virtual {p1, p2, p3}, Landroidx/coordinatorlayout/widget/CoordinatorLayout;->c(Landroid/view/View;I)V

    return-void
.end method

.class Lcom/google/android/material/internal/e;
.super La/g/i/a;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Lcom/google/android/material/internal/NavigationMenuItemView;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic c:Lcom/google/android/material/internal/NavigationMenuItemView;


# direct methods
.method constructor <init>(Lcom/google/android/material/internal/NavigationMenuItemView;)V
    .locals 0

    iput-object p1, p0, Lcom/google/android/material/internal/e;->c:Lcom/google/android/material/internal/NavigationMenuItemView;

    invoke-direct {p0}, La/g/i/a;-><init>()V

    return-void
.end method


# virtual methods
.method public a(Landroid/view/View;La/g/i/a/c;)V
    .locals 0

    invoke-super {p0, p1, p2}, La/g/i/a;->a(Landroid/view/View;La/g/i/a/c;)V

    iget-object p1, p0, Lcom/google/android/material/internal/e;->c:Lcom/google/android/material/internal/NavigationMenuItemView;

    iget-boolean p1, p1, Lcom/google/android/material/internal/NavigationMenuItemView;->y:Z

    invoke-virtual {p2, p1}, La/g/i/a/c;->a(Z)V

    return-void
.end method
